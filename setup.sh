#!/bin/bash

# 🚀 Quick Setup Script للمطورين

echo "════════════════════════════════════════"
echo "🖼️  نظام الصور - سكريبت الإعداد السريع"
echo "════════════════════════════════════════"
echo ""

# التحقق من Node.js
echo "✅ التحقق من المتطلبات..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js غير مثبت. الرجاء التثبيت من nodejs.org"
    exit 1
fi

# التحقق من npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm غير مثبت"
    exit 1
fi

NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
echo "  ✓ Node.js: $NODE_VERSION"
echo "  ✓ npm: $NPM_VERSION"
echo ""

# التثبيت
echo "📦 تثبيت المتطلبات..."
npm install > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "  ✅ تم التثبيت بنجاح"
else
    echo "  ❌ فشل التثبيت"
    exit 1
fi
echo ""

# فحص المجلدات
echo "📁 فحص مجلدات الصور..."
FOLDERS=(
    "public/images/brand"
    "public/images/features"
    "public/images/hero"
    "public/images/guides"
    "public/images/tips"
    "public/images/testimonials"
    "public/images/og-images"
)

for folder in "${FOLDERS[@]}"; do
    if [ -d "$folder" ]; then
        count=$(find "$folder" -type f | wc -l)
        echo "  ✓ $folder ($count صور)"
    else
        echo "  ❌ $folder مفقود"
        mkdir -p "$folder"
        echo "    تم إنشاء المجلد"
    fi
done
echo ""

# فحص الملفات الأساسية
echo "📄 فحص ملفات النظام..."
FILES=(
    "src/lib/image-config.ts"
    "src/lib/image-utils.ts"
    "src/lib/image-data.ts"
    "src/components/ui/OptimizedImage.tsx"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ❌ $file مفقود!"
        exit 1
    fi
done
echo ""

# فحص البناء
echo "🔨 فحص البناء..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "  ✅ البناء نجح"
else
    echo "  ❌ خطأ في البناء"
    exit 1
fi
echo ""

echo "════════════════════════════════════════"
echo "✨ الإعداد اكتمل بنجاح!"
echo "════════════════════════════════════════"
echo ""
echo "🚀 الأوامر المتاحة:"
echo "  npm run dev        # بدء السيرفر"
echo "  npm run build      # بناء الإنتاج"
echo "  npm start          # تشغيل الإنتاج"
echo ""
echo "📋 الخطوات التالية:"
echo "  1. ابدأ السيرفر:     npm run dev"
echo "  2. افتح المتصفح:    http://localhost:3000"
echo "  3. استبدل الصور:    انسخ الصور الحقيقية"
echo "  4. اختبر الأداء:     Ctrl+Shift+I → Network"
echo ""
echo "📚 للمزيد من المعلومات، اقرأ DEVELOPER_GUIDE.md"
echo ""
