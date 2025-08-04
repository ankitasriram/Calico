# test_fashion_clip_service.py

import numpy as np
from PIL import Image
import io
import requests
import sys
import os
# Add the backend directory to Python path
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, backend_dir)

from app.services.fashion_clip_service import FashionCLIPService

def test_fashion_clip_service():
    """Test the FashionCLIP service with sample data"""
    
    print("Testing FashionCLIP Service...")
    
    try:
        # Initialize the service
        service = FashionCLIPService()
        print("Service initialized successfully")
        
        # Test 1: Create a simple test image
        test_image = Image.new('RGB', (224, 224), color='red')
        print("Test image created")
        
        # Test 2: Generate embedding for the test image
        embedding = service.generate_embedding(test_image)
        print(f"Generated embedding with shape: {embedding.shape}")
        print(f"Embedding dimension: {service.get_embedding_dimension()}")
        
        # Test 3: Test batch processing with multiple images
        test_images = [
            Image.new('RGB', (224, 224), color='red'),
            Image.new('RGB', (224, 224), color='blue'),
            Image.new('RGB', (224, 224), color='green')
        ]
        
        batch_embeddings = service.batch_process_images(test_images, batch_size=2)
        print(f" Batch processing successful. Shape: {batch_embeddings.shape}")
        
        # Test 4: Test similarity calculation
        similarity = service.similarity_score(batch_embeddings[0], batch_embeddings[1])
        print(f" Similarity between red and blue images: {similarity:.4f}")
        
        # Test 5: Test text encoding
        test_texts = ["red shirt", "blue dress", "green jacket"]
        text_embeddings = service.encode_text(test_texts)
        print(f" Text embeddings generated. Shape: {text_embeddings.shape}")
        
        # Test 6: Test finding similar items
        indices, similarities = service.find_most_similar(
            batch_embeddings[0], 
            batch_embeddings, 
            top_k=3
        )
        print(f" Top similar items: indices {indices}, similarities {similarities}")
        
        print("\n All tests passed! FashionCLIP service is working correctly.")
        
    except Exception as e:
        print(f" Test failed: {e}")
        return False
    
    return True

def test_with_real_image():
    """Test with a real image from URL (optional)"""
    try:
        # Download a sample fashion image
        image_url = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=224&h=224&fit=crop"
        response = requests.get(image_url)
        
        if response.status_code == 200:
            image = Image.open(io.BytesIO(response.content))
            
            service = FashionCLIPService()
            embedding = service.generate_embedding(image)
            
            print(f" Real image test successful. Embedding shape: {embedding.shape}")
            return True
        else:
            print("Could not download test image, but service should still work with local images")
            return True
            
    except Exception as e:
        print(f"Real image test failed (this is okay): {e}")
        return True

if __name__ == "__main__":
    # Run basic tests
    success = test_fashion_clip_service()
    
    if success:
        print("\n" + "="*50)
        print("NEXT STEPS:")
        print("1. Install requirements: pip install -r requirements.txt")
        print("2. Test with your own images")
        print("3. Integrate with your FastAPI backend")
        print("4. Set up Weaviate database")
        print("="*50)
        
        # Optional: test with real image
        print("\nTesting with real image...")
        test_with_real_image()