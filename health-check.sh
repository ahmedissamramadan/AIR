#!/bin/bash

# 🔍 AIR Project Health Check Script
# يفحص المشروع ويعطي تقرير بالمشاكل

echo "🚀 بدء فحص مشروع AIR..."
echo "================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter
issues=0

echo ""
echo "📦 1. فحص Node Modules..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ node_modules موجودة${NC}"
else
    echo -e "${RED}❌ node_modules غير موجودة - قم بتشغيل: npm install${NC}"
    ((issues++))
fi

echo ""
echo "🔧 2. فحص Environment Variables..."
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✅ .env.local موجود${NC}"
else
    echo -e "${YELLOW}⚠️  .env.local غير موجود - قد تحتاج إلى إنشائه${NC}"
    ((issues++))
fi

echo ""
echo "📝 3. فحص TypeScript..."
npm run type-check 2>&1 | head -20
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ لا توجد أخطاء TypeScript${NC}"
else
    echo -e "${RED}❌ يوجد أخطاء TypeScript${NC}"
    ((issues++))
fi

echo ""
echo "🎨 4. فحص ESLint..."
npm run lint 2>&1 | head -20
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ لا توجد أخطاء ESLint${NC}"
else
    echo -e "${YELLOW}⚠️  يوجد تحذيرات ESLint${NC}"
    ((issues++))
fi

echo ""
echo "🏗️  5. محاولة Build..."
echo "جاري بناء المشروع..."
npm run build 2>&1 | tail -20
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build نجح${NC}"
else
    echo -e "${RED}❌ Build فشل${NC}"
    ((issues++))
fi

echo ""
echo "================================"
echo "📊 ملخص النتائج:"
echo "================================"

if [ $issues -eq 0 ]; then
    echo -e "${GREEN}🎉 رائع! لا توجد مشاكل${NC}"
    echo "المشروع جاهز للتطوير والنشر"
else
    echo -e "${YELLOW}⚠️  تم العثور على $issues مشكلة${NC}"
    echo "راجع التفاصيل أعلاه وقم بإصلاحها"
fi

echo ""
echo "📚 للمزيد من المعلومات:"
echo "- راجع FIXES_AND_IMPROVEMENTS.md"
echo "- راجع ACTION_PLAN.md"
echo ""
