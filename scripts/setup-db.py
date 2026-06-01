#!/usr/bin/env python3
"""
Setup Mwalimu AI database schema using Supabase connection
"""

import os
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

try:
    import psycopg
except ImportError:
    print("Installing psycopg...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "psycopg[binary]"])
    import psycopg

# Get environment variables
supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
supabase_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

if not supabase_url or not supabase_key:
    print("ERROR: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
    sys.exit(1)

# Extract connection details from Supabase URL
# Format: https://xxxxx.supabase.co
project_id = supabase_url.split('//')[1].split('.')[0]

# Read the SQL migration file
sql_file = Path(__file__).parent / "001_create_tables.sql"
if not sql_file.exists():
    print(f"ERROR: SQL file not found at {sql_file}")
    sys.exit(1)

with open(sql_file, 'r') as f:
    sql_content = f.read()

# Connect to Supabase PostgreSQL
try:
    print(f"Connecting to Supabase project: {project_id}")
    
    conn = psycopg.connect(
        host=f"{project_id}.supabase.co",
        port="5432",
        database="postgres",
        user="postgres",
        password=supabase_key,
        autocommit=False
    )
    
    with conn.cursor() as cur:
        print("Executing migration script...")
        cur.execute(sql_content)
        conn.commit()
    
    print("✓ Database migration completed successfully!")
    conn.close()
    
except Exception as e:
    print(f"ERROR: {e}")
    sys.exit(1)
