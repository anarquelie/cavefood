# Quick Setup Guide - Updated for Your CSV Format

## Your Google Sheet Structure:
```
Date       | Event              | Amount    | Completed | Comment
2026-01-27 | Starting balance  | 2820.0    | True      | 
2026-01-27 | Groceries         | -29.44    | True      |
2026-01-28 | Guinea pigs       | -70.0     | True      | Foin + Vitamine C
```

## Setup Steps:

### 1. Add Your API Key to the HTML File
1. Open `financial-manager-sheets.html` in a text editor
2. Find line ~563: `const API_KEY = 'YOUR_API_KEY_HERE';`
3. Replace with your actual API key
4. Save the file

### 2. Prepare Your Google Sheet
1. Go to Google Sheets and create a new sheet
2. In row 1, add these headers:
   ```
   Date | Event | Amount | Completed | Comment
   ```
3. Import your CSV file:
   - File → Import → Upload
   - Choose `cashflow_table_notion_import.csv`
   - Import data

4. Share the sheet:
   - Click "Share" (top right)
   - "Anyone with the link" → "Editor"
   - Click "Done"

5. Copy the Sheet ID:
   - From URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
   - Copy the long string between `/d/` and `/edit`

### 3. Connect the App
1. Open `financial-manager-sheets.html` in your browser
2. Paste your Sheet ID
3. Click "Connect to Google Sheet"
4. Done! Your data will load automatically

## How It Works:

### Data Format:
- **Date**: ISO format (2026-01-27)
- **Completed**: 
  - `True` = ✅ (completed, counts toward available balance)
  - `False` = ⏳ (pending, excluded from available balance)
- **Balance**: Calculated automatically by the app (not stored in sheet)

### Available Balance Calculation:
The app shows your **real money** by:
- ✅ Including all transactions where Completed = `True`
- ⏳ Excluding all transactions where Completed = `False`

Example from your data:
- All completed transactions: €1,517.04 (available balance)
- All pending transactions: -€2,933.40
- Total balance (if all pending complete): -€1,416.36

### Adding New Transactions:
1. Click "+ Add Transaction"
2. Fill in Event and Amount (required)
3. Choose Status:
   - ✅ Completed → saves as `True` in sheet
   - ⏳ Pending → saves as `False` in sheet
4. Click "Save to Google Sheet"

The transaction is immediately saved to your Google Sheet and you can see it there!

## Troubleshooting:

**"Failed to load sheet"**
- Check your API key is correct in the HTML file
- Verify Sheet ID is correct
- Make sure sheet is shared with "Editor" access

**Balance looks wrong**
- Check the "Completed" column in your sheet (should be True/False)
- Click "🔄 Refresh" to reload from sheet

**Can't save transactions**
- Sheet must be shared with "Editor" access (not "Viewer")
- Check your internet connection

## Mobile Access:

### Add to Phone Home Screen:
1. Upload to GitHub Pages (rename to `index.html`)
2. Open on phone browser
3. **iPhone**: Safari → Share → Add to Home Screen
4. **Android**: Chrome → Menu → Add to Home Screen

Now you have a native-feeling app! 📱
