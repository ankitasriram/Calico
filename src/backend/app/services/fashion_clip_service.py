# backend/app/services/fashion_clip_service.py

import numpy as np
import logging
from typing import List, Union, Optional
from PIL import Image
import io
import base64
from pathlib import Path
import torch

from fashion_clip.fashion_clip import FashionCLIP

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class FashionCLIPService:
    """
    Service class for handling FashionCLIP operations including:
    - Image preprocessing
    - Embedding generation
    - Batch processing
    """
    
    def __init__(self, model_name: str = 'fashion-clip', normalize: bool = True):
        """
        Initialize FashionCLIP service
        
        Args:
            model_name: Name of the FashionCLIP model to use
            normalize: Whether to normalize embeddings to unit norm
        """
        self.model_name = model_name
        self.normalize = normalize
        self._model = None
        self._load_model()
    
    def _load_model(self):
        """Load the FashionCLIP model"""
        try:
            logger.info(f"Loading FashionCLIP model: {self.model_name}")
            self._model = FashionCLIP(self.model_name)
            logger.info("FashionCLIP model loaded successfully")
        except Exception as e:
            logger.error(f"Failed to load FashionCLIP model: {e}")
            raise
    
    def preprocess_image(self, image_input: Union[str, Image.Image, bytes]) -> Image.Image:
        """
        Preprocess image for FashionCLIP
        
        Args:
            image_input: Can be file path, PIL Image, or bytes
            
        Returns:
            Preprocessed PIL Image
        """
        try:
            # Handle different input types
            if isinstance(image_input, str):
                # File path
                image = Image.open(image_input)
            elif isinstance(image_input, bytes):
                # Bytes data
                image = Image.open(io.BytesIO(image_input))
            elif isinstance(image_input, Image.Image):
                # Already a PIL Image
                image = image_input
            else:
                raise ValueError(f"Unsupported image input type: {type(image_input)}")
            
            # Convert to RGB if necessary
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # FashionCLIP typically works with 224x224 images
            # But we'll let the model handle resizing to maintain aspect ratio
            
            return image
            
        except Exception as e:
            logger.error(f"Error preprocessing image: {e}")
            raise
    
    def generate_embedding(self, image_input: Union[str, Image.Image, bytes]) -> np.ndarray:
        """
        Generate embedding for a single image
        
        Args:
            image_input: Image as file path, PIL Image, or bytes
            
        Returns:
            Numpy array containing the image embedding
        """
        try:
            # Preprocess the image
            image = self.preprocess_image(image_input)
            
            # Generate embedding using FashionCLIP
            # Note: FashionCLIP expects a list of images
            embeddings = self._model.encode_images([image], batch_size=1)
            
            # Get the first (and only) embedding
            embedding = embeddings[0]
            
            # Normalize if requested
            if self.normalize:
                embedding = self._normalize_embedding(embedding)
            
            logger.info(f"Generated embedding with shape: {embedding.shape}")
            return embedding
            
        except Exception as e:
            logger.error(f"Error generating embedding: {e}")
            raise
    
    def batch_process_images(self, image_inputs: List[Union[str, Image.Image, bytes]], 
                           batch_size: int = 32) -> np.ndarray:
        """
        Process multiple images in batches
        
        Args:
            image_inputs: List of images (file paths, PIL Images, or bytes)
            batch_size: Number of images to process at once
            
        Returns:
            Numpy array of shape (n_images, embedding_dim)
        """
        try:
            # Preprocess all images
            images = []
            for img_input in image_inputs:
                processed_img = self.preprocess_image(img_input)
                images.append(processed_img)
            
            # Generate embeddings in batches
            all_embeddings = []
            
            for i in range(0, len(images), batch_size):
                batch = images[i:i + batch_size]
                logger.info(f"Processing batch {i//batch_size + 1}/{(len(images) + batch_size - 1)//batch_size}")
                
                # Generate embeddings for this batch
                batch_embeddings = self._model.encode_images(batch, batch_size=len(batch))
                all_embeddings.append(batch_embeddings)
            
            # Concatenate all embeddings
            embeddings = np.concatenate(all_embeddings, axis=0)
            
            # Normalize if requested
            if self.normalize:
                embeddings = self._normalize_embeddings(embeddings)
            
            logger.info(f"Generated {embeddings.shape[0]} embeddings with shape: {embeddings.shape}")
            return embeddings
            
        except Exception as e:
            logger.error(f"Error in batch processing: {e}")
            raise
    
    def _normalize_embedding(self, embedding: np.ndarray) -> np.ndarray:
        """Normalize a single embedding to unit norm"""
        return embedding / np.linalg.norm(embedding, ord=2)
    
    def _normalize_embeddings(self, embeddings: np.ndarray) -> np.ndarray:
        """Normalize multiple embeddings to unit norm"""
        return embeddings / np.linalg.norm(embeddings, ord=2, axis=-1, keepdims=True)
    
    def encode_text(self, texts: List[str], batch_size: int = 32) -> np.ndarray:
        """
        Generate embeddings for text descriptions (useful for text-based search)
        
        Args:
            texts: List of text descriptions
            batch_size: Batch size for processing
            
        Returns:
            Numpy array of text embeddings
        """
        try:
            embeddings = self._model.encode_text(texts, batch_size=batch_size)
            
            if self.normalize:
                embeddings = self._normalize_embeddings(embeddings)
            
            return embeddings
            
        except Exception as e:
            logger.error(f"Error encoding text: {e}")
            raise
    
    def get_embedding_dimension(self) -> int:
        """Get the dimension of embeddings produced by this model"""
        # FashionCLIP typically produces 512-dimensional embeddings
        return 512
    
    def similarity_score(self, embedding1: np.ndarray, embedding2: np.ndarray) -> float:
        """
        Calculate similarity between two embeddings
        
        Args:
            embedding1: First embedding
            embedding2: Second embedding
            
        Returns:
            Similarity score (higher = more similar)
        """
        if self.normalize:
            # If embeddings are normalized, we can use dot product
            return np.dot(embedding1, embedding2)
        else:
            # Use cosine similarity
            return np.dot(embedding1, embedding2) / (
                np.linalg.norm(embedding1) * np.linalg.norm(embedding2)
            )
    
    def find_most_similar(self, query_embedding: np.ndarray, 
                         candidate_embeddings: np.ndarray, 
                         top_k: int = 10) -> tuple:
        """
        Find most similar embeddings to a query
        
        Args:
            query_embedding: Query embedding to search for
            candidate_embeddings: Array of candidate embeddings
            top_k: Number of top results to return
            
        Returns:
            Tuple of (indices, similarities) for top matches
        """
        # Calculate similarities
        if self.normalize:
            similarities = np.dot(candidate_embeddings, query_embedding)
        else:
            # Cosine similarity
            norms = np.linalg.norm(candidate_embeddings, axis=1)
            query_norm = np.linalg.norm(query_embedding)
            similarities = np.dot(candidate_embeddings, query_embedding) / (norms * query_norm)
        
        # Get top k indices
        top_indices = np.argsort(similarities)[::-1][:top_k]
        top_similarities = similarities[top_indices]
        
        return top_indices, top_similarities


# Utility functions for easier usage
def create_fashion_clip_service() -> FashionCLIPService:
    """Factory function to create FashionCLIP service with default settings"""
    return FashionCLIPService()

def process_single_image(image_path: str) -> np.ndarray:
    """Quick function to process a single image"""
    service = create_fashion_clip_service()
    return service.generate_embedding(image_path)

# Example usage and testing
if __name__ == "__main__":
    # Example usage
    service = FashionCLIPService()
    
    # Test with a single image (you'll need to provide an actual image path)
    # embedding = service.generate_embedding("path/to/your/image.jpg")
    # print(f"Embedding shape: {embedding.shape}")
    
    # Test with multiple images
    # image_paths = ["image1.jpg", "image2.jpg", "image3.jpg"]
    # embeddings = service.batch_process_images(image_paths)
    # print(f"Batch embeddings shape: {embeddings.shape}")
    
    print("FashionCLIP service created successfully!")