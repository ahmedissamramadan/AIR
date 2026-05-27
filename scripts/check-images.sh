#!/bin/bash

# 🔍 Script فحص الصور

echo ""
echo "════════════════════════════════════════"
echo "🔍 فحص الصور - تقرير شامل"
echo "════════════════════════════════════════"
echo ""

IMAGES_DIR="public/images"
TOTAL_SIZE=0
IMAGE_COUNT=0

# فحص كل مجلد
echo "📁 تفصيل الصور بحسب الفئة:"
echo ""

for category in "$IMAGES_DIR"/*; do
    if [ -d "$category" ]; then
        category_name=$(basename "$category")
        count=$(find "$category" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | wc -l)
        
        if [ $count -gt 0 ]; then
            size=$(du -sh "$category" | awk '{print $1}')
            echo "📦 $category_name"
            echo "   عدد الصور: $count"
            echo "   الحجم: $size"
            echo ""
            
            # إحصائيات
            IMAGE_COUNT=$((IMAGE_COUNT + count))
            category_size=$(du -s "$category" | awk '{print $1}')
            TOTAL_SIZE=$((TOTAL_SIZE + category_size))
            
            # قائمة الصور
            echo "   الملفات:"
            find "$category" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | while read file; do
                size_bytes=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
                size_kb=$((size_bytes / 1024))
                filename=$(basename "$file")
                printf "      • %s (%d KB)\n" "$filename" "$size_kb"
            done
            echo ""
        fi
    fi
done

# الإجمالي
echo "════════════════════════════════════════"
echo "📊 الإحصائيات الإجمالية:"
echo ""
echo "   إجمالي الصور: $IMAGE_COUNT"
echo "   الحجم الإجمالي: $((TOTAL_SIZE / 1024)) MB"
echo ""

# فحص الأحجام الموصى بها
echo "✅ فحص الأحجام الموصى بها:"
echo ""

check_dimension() {
    local file=$1
    local min_width=${2:-300}
    local max_width=${3:-1440}
    
    # على macOS
    if command -v identify &> /dev/null; then
        dims=$(identify "$file" 2>/dev/null | grep -o '[0-9]*x[0-9]*' | head -1)
        if [ ! -z "$dims" ]; then
            width=$(echo $dims | cut -d'x' -f1)
            if [ $width -ge $min_width ] && [ $width -le $max_width ]; then
                echo "   ✓ $(basename $file): $dims"
            else
                echo "   ⚠️  $(basename $file): $dims (خارج النطاق المتوقع)"
            fi
        fi
    fi
}

# تحقق من صور معينة
for file in "$IMAGES_DIR"/features/*.png; do
    if [ -f "$file" ]; then
        check_dimension "$file" 500 700
    fi
done

echo ""
echo "════════════════════════════════════════"
echo "✅ الفحص اكتمل!"
echo "════════════════════════════════════════"
echo ""
