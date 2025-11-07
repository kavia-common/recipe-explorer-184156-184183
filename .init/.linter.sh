#!/bin/bash
cd /home/kavia/workspace/code-generation/recipe-explorer-184156-184183/recipe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

