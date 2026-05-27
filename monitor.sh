#!/bin/bash
# Auto-refresh monitoring script for Zakaa Amaly project

clear
echo "🎯 ZAKAA AMALY - LIVE MONITORING DASHBOARD"
echo "=========================================="
echo ""

while true; do
    # Clear and show header
    tput cup 3 0
    
    echo "⏰ Time: $(date '+%H:%M:%S')"
    echo ""
    
    # Git Status
    echo "📊 GIT STATUS:"
    git status --short | head -15
    echo ""
    
    # Recent Commits
    echo "📝 RECENT COMMITS:"
    git log --oneline -3
    echo ""
    
    # File Count
    echo "📁 FILES:"
    echo "Total: $(find . -type f -not -path './node_modules/*' -not -path './.git/*' -not -path './.next/*' | wc -l | xargs)"
    echo ".DS_Store: $(find . -name '.DS_Store' | wc -l | xargs)"
    echo ""
    
    # npm audit status
    echo "🔒 SECURITY:"
    npm audit --json 2>/dev/null | grep -o '"total":[0-9]*' | head -1 | cut -d: -f2 | xargs echo "Vulnerabilities:"
    echo ""
    
    # Refresh every 5 seconds
    echo "🔄 Auto-refresh in 5s... (Ctrl+C to stop)"
    sleep 5
done
