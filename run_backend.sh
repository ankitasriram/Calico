#!/bin/bash
echo "Running Uvicorn..."
#!/bin/bash
uvicorn src.backend.main:app --reload --host 0.0.0.0 --port 8000
echo "Uvicorn exited"
