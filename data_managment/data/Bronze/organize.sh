#!/usr/bin/env bash
# ─────────────────────────────────────────────
#  organize_files_recursive.sh
#  Usage: ./organize_files.sh [TARGET_DIR]
# ─────────────────────────────────────────────

set -euo pipefail

# ── Config ────────────────────────────────────
TARGET_DIR="${1:-.}"          # First argument or current directory
UNKNOWN_DIR="no_extension"    # Folder for files with no extension
# ─────────────────────────────────────────────

# Resolve to absolute path
TARGET_DIR="$(cd "$TARGET_DIR" && pwd)"

echo "📂  Organizing files recursively in: $TARGET_DIR"
echo "────────────────────────────────────────"

moved=0
skipped=0

# find now searches recursively. 
# We use -not -path to prevent the script from looking inside the folders it creates.
while IFS= read -r -d '' file; do
    filename="$(basename "$file")"

    # Skip hidden files (dot-files)
    [[ "$filename" == .* ]] && continue

    # Determine extension (lowercase)
    ext="${filename##*.}"

    # If no extension (filename has no dot)
    if [[ "$ext" == "$filename" || -z "$ext" ]]; then
        ext="$UNKNOWN_DIR"
    else
        ext="${ext,,}"   # lowercase
    fi

    # Destination folder (Always relative to the root TARGET_DIR)
    dest_dir="$TARGET_DIR/$ext"

    # Skip if the file is already inside its specific destination extension folder
    # This prevents the script from re-processing files it just moved.
    if [[ "$(dirname "$file")" == "$dest_dir" ]]; then
        ((skipped++)) || true
        continue
    fi

    # Create destination folder if needed
    mkdir -p "$dest_dir"

    # Handle name collisions by appending a counter
    dest_file="$dest_dir/$filename"
    if [[ -e "$dest_file" ]]; then
        base="${filename%.*}"
        # For files with no extension, the base is the filename
        [[ "$ext" == "$UNKNOWN_DIR" ]] && base="$filename"
        
        counter=1
        while [[ -e "$dest_dir/${base}_${counter}.${ext}" ]]; do
            ((counter++))
        done
        
        if [[ "$ext" == "$UNKNOWN_DIR" ]]; then
             dest_file="$dest_dir/${base}_${counter}"
        else
             dest_file="$dest_dir/${base}_${counter}.${ext}"
        fi
    fi

    mv "$file" "$dest_file"
    echo "  ✅  [$ext]  $filename"
    ((moved++)) || true

# Removed -maxdepth 1 to enable recursion
# Added -type f to only target files
done < <(find "$TARGET_DIR" -type f -print0)

echo "────────────────────────────────────────"
echo "✔  Done — $moved file(s) moved, $skipped already in place."