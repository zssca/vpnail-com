#!/usr/bin/env python3
"""Script to update all service data files with image assignments"""

import os
import re

# Service names and their image counts
SERVICES = {
    'ritual-facial': 5,
    'radiant-peel': 5,
    'renewal-facial': 5,
    'renewal-plus-prp': 5,
    'neuromodulators': 5,
    'dermal-fillers': 6,
    'sculptra-skin-boosters': 10,
}

BASE_PATH = 'features/marketing/services/data/services'

def update_core_data(service_name):
    """Update core.data.ts to add image to treatmentInfo"""
    file_path = os.path.join(BASE_PATH, service_name, 'core.data.ts')

    if not os.path.exists(file_path):
        print(f"Warning: {file_path} not found")
        return

    with open(file_path, 'r') as f:
        content = f.read()

    # Check if image is already added
    if 'treatmentInfo.*image:' in content or f'{service_name}-002.webp' in content:
        print(f"  ✓ {service_name} core.data.ts already has image")
        return

    # Find treatmentInfo export and add image before the closing brace
    pattern = r'(export const \w+TreatmentInfo: TreatmentInfoData = \{[^}]+satisfaction: \'[^\']+\'),([ \t]*\n\})'

    service_display = service_name.replace("-", " ").title()
    replacement = f"\\1,\n  image: '/images/content/services/{service_name}/{service_name}-002.webp',\n  imageAlt: '{service_display} treatment session details',\\2"

    new_content = re.sub(pattern, replacement, content, flags=re.MULTILINE | re.DOTALL)

    if new_content != content:
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"  ✓ Updated {service_name} core.data.ts")
    else:
        print(f"  ✗ Could not update {service_name} core.data.ts")

def update_science_data(service_name, image_count):
    """Update science.data.ts to add image to results and gallery"""
    file_path = os.path.join(BASE_PATH, service_name, 'science.data.ts')

    if not os.path.exists(file_path):
        print(f"Warning: {file_path} not found")
        return

    with open(file_path, 'r') as f:
        content = f.read()

    # Update import statement
    if 'GalleryData' not in content:
        content = content.replace(
            'import type { ',
            'import type { GalleryData, '
        )

    # Add image to results if not present
    if f'{service_name}-003.webp' not in content:
        pattern = r'(export const \w+Results: ResultsData = \{[^}]+stats: \[[^\]]+\],)([ \t]*\n\})'

        service_display = service_name.replace("-", " ").title()
        replacement = f"\\1,\n  image: '/images/content/services/{service_name}/{service_name}-003.webp',\n  imageAlt: '{service_display} expected results and outcomes',\\2"

        content = re.sub(pattern, replacement, content, flags=re.MULTILINE | re.DOTALL)

    # Add gallery export if not present
    if 'Gallery: GalleryData' not in content:
        # Determine gallery images (from image 4 to image_count)
        gallery_images = []
        service_display = service_name.replace("-", " ").title()
        for i in range(4, min(image_count + 1, 7)):  # Limit to 3 gallery images max
            img_str = f"    {{\n      src: '/images/content/services/{service_name}/{service_name}-{i:03d}.webp',\n      alt: '{service_display} treatment process',\n    }}"
            gallery_images.append(img_str)

        camel_case_name = ''.join(word.capitalize() for word in service_name.split('-'))
        service_display_name = service_name.replace("-", " ")
        images_str = ',\n'.join(gallery_images)

        gallery_export = f'''
export const {camel_case_name[0].lower()}{camel_case_name[1:]}Gallery: GalleryData = {{
  badge: 'Treatment gallery',
  title: 'Treatment Experience',
  description: 'See our {service_display_name} process and environment',
  images: [
{images_str},
  ],
}}
'''

        content += gallery_export

    with open(file_path, 'w') as f:
        f.write(content)
    print(f"  ✓ Updated {service_name} science.data.ts")

def update_index(service_name):
    """Update index.ts to include gallery"""
    file_path = os.path.join(BASE_PATH, service_name, 'index.ts')

    if not os.path.exists(file_path):
        print(f"Warning: {file_path} not found")
        return

    with open(file_path, 'r') as f:
        content = f.read()

    # Add gallery to imports from science.data
    camel_name = ''.join(word.capitalize() for word in service_name.split('-'))
    gallery_name = f'{camel_name[0].lower()}{camel_name[1:]}Gallery'

    if gallery_name not in content:
        # Add to import
        pattern = r'(import \{[^}]*from \'\.\/science\.data\')'
        if 'Gallery' in content:
            pass  # Already imported
        else:
            content = re.sub(
                r'(import \{[^\}]+)([\s\}]+from \'\.\/science\.data\')',
                f'\\1,\\n  {gallery_name},\\2',
                content
            )

        # Add to data object
        pattern = r'(seo: \w+Seo,)([\s\}]+\})'
        content = re.sub(
            pattern,
            f'\\1\\n  gallery: {gallery_name},\\2',
            content
        )

    with open(file_path, 'w') as f:
        f.write(content)
    print(f"  ✓ Updated {service_name} index.ts")

def main():
    print("Updating all service data files with images...\n")

    for service_name, image_count in SERVICES.items():
        print(f"Processing {service_name} ({image_count} images)...")
        update_core_data(service_name)
        update_science_data(service_name, image_count)
        update_index(service_name)
        print()

    print("✅ All services updated!")

if __name__ == '__main__':
    main()
