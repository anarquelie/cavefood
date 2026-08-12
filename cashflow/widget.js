// Cashflow Widget for iOS
// Install the "Scriptable" app from App Store
// Create a new script and paste this code
// Add a Scriptable widget to home screen and select this script

// ============================================
// CONFIGURATION - REPLACE WITH YOUR INFO
// ============================================
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxTExUWOXRnh9t9nBmCQRSIiVsLQnTHGMnlXQ7AtbhFJDSE8j0RJK7WEWUmT-D52nfvig/exec"; // Replace with your actual URL
// Example: "https://script.google.com/macros/s/AKfycbz.../exec"

// ============================================
// WIDGET CODE
// ============================================

// Detect widget size
const widgetFamily = config.widgetFamily || "small";

// Detect system appearance (light or dark mode)
const isDarkMode = Device.isUsingDarkAppearance();

// Create widget
let widget = new ListWidget();

// Set background based on system appearance
if (isDarkMode) {
  widget.backgroundColor = new Color("#2C2C2E"); // iOS dark mode widget background
} else {
  widget.backgroundColor = new Color("#ffffff"); // White in light mode
}

widget.setPadding(16, 16, 16, 16);

try {
  // Fetch balance data
  let url = `${SCRIPT_URL}?action=getBalance`;
  let req = new Request(url);
  let response = await req.loadJSON();
  
  if (response.success) {
    let myMoney = parseFloat(response.balance.myMoney);
    let available = parseFloat(response.balance.available);
    let availableNextMonth = parseFloat(response.balance.availableNextMonth);
    
    // Text colors based on mode
    const primaryColor = isDarkMode ? Color.white() : new Color("#333333");
    const secondaryColor = isDarkMode ? new Color("#ffffff", 0.7) : new Color("#999999");
    const brandColor = isDarkMode ? new Color("#ffffff", 0.5) : new Color("#999999");
    
    if (widgetFamily === "small") {
      // SMALL WIDGET - Clean minimal design
      
      let myMoneyLabel = widget.addText("My money");
      myMoneyLabel.font = Font.systemFont(11);
      myMoneyLabel.textColor = secondaryColor;
      
      widget.addSpacer(2);
      
      let myMoneyValue = widget.addText(`€${Math.abs(myMoney).toFixed(2)}`);
      myMoneyValue.font = Font.boldSystemFont(24);
      myMoneyValue.textColor = myMoney >= 0 ? new Color("#27ae60") : new Color("#e74c3c");
      
      widget.addSpacer(12);
      
      let availableLabel = widget.addText("Available");
      availableLabel.font = Font.systemFont(10);
      availableLabel.textColor = secondaryColor;
      
      widget.addSpacer(2);
      
      let availableValue = widget.addText(`€${available.toFixed(2)}`);
      availableValue.font = Font.semiboldSystemFont(14);
      availableValue.textColor = primaryColor;
      
      widget.addSpacer();
      
      // Bottom row: time on left, "cashflow" on right
      let bottomRow = widget.addStack();
      bottomRow.layoutHorizontally();
      
      let now = new Date();
      let timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
      let updated = bottomRow.addText(timeStr);
      updated.font = Font.systemFont(8);
      updated.textColor = brandColor;
      
      bottomRow.addSpacer();
      
      let branding = bottomRow.addText("cashflow");
      branding.font = Font.systemFont(8);
      branding.textColor = brandColor;
      
    } else if (widgetFamily === "medium") {
      // MEDIUM WIDGET - Show all three balances in a row
      let title = widget.addText("Cashflow");
      title.font = Font.boldSystemFont(14);
      title.textColor = primaryColor;
      
      widget.addSpacer(12);
      
      // My Money
      let myMoneyLabel = widget.addText("My money");
      myMoneyLabel.font = Font.systemFont(10);
      myMoneyLabel.textColor = secondaryColor;
      
      let myMoneyValue = widget.addText(`€${Math.abs(myMoney).toFixed(2)}`);
      myMoneyValue.font = Font.boldSystemFont(20);
      myMoneyValue.textColor = myMoney >= 0 ? new Color("#27ae60") : new Color("#e74c3c");
      
      widget.addSpacer(8);
      
      // Two columns for Available and Next Month
      let row = widget.addStack();
      row.layoutHorizontally();
      row.spacing = 16;
      
      // Left column - Available
      let leftCol = row.addStack();
      leftCol.layoutVertically();
      
      let availableLabel = leftCol.addText("Available");
      availableLabel.font = Font.systemFont(9);
      availableLabel.textColor = secondaryColor;
      
      leftCol.addSpacer(2);
      
      let availableValue = leftCol.addText(`€${available.toFixed(2)}`);
      availableValue.font = Font.semiboldSystemFont(13);
      availableValue.textColor = primaryColor;
      
      row.addSpacer();
      
      // Right column - Next Month
      let rightCol = row.addStack();
      rightCol.layoutVertically();
      
      let nextLabel = rightCol.addText("Next month");
      nextLabel.font = Font.systemFont(9);
      nextLabel.textColor = secondaryColor;
      
      rightCol.addSpacer(2);
      
      let nextValue = rightCol.addText(`€${availableNextMonth.toFixed(2)}`);
      nextValue.font = Font.semiboldSystemFont(13);
      nextValue.textColor = availableNextMonth >= 0 ? primaryColor : new Color("#e74c3c");
      
      widget.addSpacer();
      
      // Bottom row
      let bottomRow = widget.addStack();
      bottomRow.layoutHorizontally();
      
      let now = new Date();
      let timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
      let updated = bottomRow.addText(`Updated: ${timeStr}`);
      updated.font = Font.systemFont(8);
      updated.textColor = brandColor;
      
      bottomRow.addSpacer();
      
      let branding = bottomRow.addText("cashflow");
      branding.font = Font.systemFont(8);
      branding.textColor = brandColor;
      
    } else {
      // LARGE WIDGET - Show all three balances vertically with more detail
      let title = widget.addText("Cashflow");
      title.font = Font.boldSystemFont(16);
      title.textColor = primaryColor;
      
      widget.addSpacer(16);
      
      // My Money
      let myMoneyLabel = widget.addText("My money");
      myMoneyLabel.font = Font.systemFont(11);
      myMoneyLabel.textColor = secondaryColor;
      
      let myMoneyValue = widget.addText(`€${Math.abs(myMoney).toFixed(2)}`);
      myMoneyValue.font = Font.boldSystemFont(28);
      myMoneyValue.textColor = myMoney >= 0 ? new Color("#27ae60") : new Color("#e74c3c");
      
      widget.addSpacer(16);
      
      // Available in account
      let availableLabel = widget.addText("Available in account");
      availableLabel.font = Font.systemFont(11);
      availableLabel.textColor = secondaryColor;
      
      let availableValue = widget.addText(`€${available.toFixed(2)}`);
      availableValue.font = Font.semiboldSystemFont(18);
      availableValue.textColor = primaryColor;
      
      widget.addSpacer(16);
      
      // Available next month
      let nextMonthLabel = widget.addText("Available next month");
      nextMonthLabel.font = Font.systemFont(11);
      nextMonthLabel.textColor = secondaryColor;
      
      let nextMonthValue = widget.addText(`€${availableNextMonth.toFixed(2)}`);
      nextMonthValue.font = Font.semiboldSystemFont(18);
      nextMonthValue.textColor = availableNextMonth >= 0 ? primaryColor : new Color("#e74c3c");
      
      widget.addSpacer();
      
      // Bottom row
      let bottomRow = widget.addStack();
      bottomRow.layoutHorizontally();
      
      let now = new Date();
      let timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
      let updated = bottomRow.addText(`Updated: ${timeStr}`);
      updated.font = Font.systemFont(9);
      updated.textColor = brandColor;
      
      bottomRow.addSpacer();
      
      let branding = bottomRow.addText("cashflow");
      branding.font = Font.systemFont(9);
      branding.textColor = brandColor;
    }
    
  } else {
    // Error state
    const errorColor = isDarkMode ? Color.white() : new Color("#333333");
    let errorText = widget.addText("⚠️ Failed to load");
    errorText.font = Font.systemFont(14);
    errorText.textColor = errorColor;
  }
  
} catch (error) {
  // Error state
  const errorColor = isDarkMode ? Color.white() : new Color("#333333");
  let errorText = widget.addText("⚠️ Connection error");
  errorText.font = Font.systemFont(14);
  errorText.textColor = errorColor;
  
  widget.addSpacer(4);
  
  let errorDetail = widget.addText(error.toString());
  errorDetail.font = Font.systemFont(10);
  errorDetail.textColor = isDarkMode ? new Color("#ffffff", 0.7) : new Color("#999999");
}

// Widget tap action - run this script to show form
// When you create this script in Scriptable, name it exactly: "Cashflow Quick Add"
// Then tap the widget to run it
const scriptName = "Cashflow Quick Add";
widget.url = `scriptable:///run/${scriptName}`;

async function showQuickTransactionForm() {
  // Amount (required)
  let alert = new Alert();
  alert.title = "Add Transaction";
  alert.message = "Enter amount";
  alert.addTextField("Amount", "", "50.00");
  alert.addAction("Next");
  alert.addCancelAction("Cancel");
  let amountResult = await alert.presentAlert();
  
  if (amountResult === -1) return; // Cancelled
  
  let amount = alert.textFieldValue(0);
  if (!amount || parseFloat(amount) === 0) {
    alert = new Alert();
    alert.title = "Error";
    alert.message = "Amount is required";
    alert.addAction("OK");
    await alert.presentAlert();
    return;
  }
  
  // Transaction name (optional)
  alert = new Alert();
  alert.title = "Add Transaction";
  alert.message = "Transaction name (optional)";
  alert.addTextField("Name", "", "Purchase");
  alert.addAction("Next");
  alert.addCancelAction("Skip");
  let nameResult = await alert.presentAlert();
  
  let transactionName = nameResult === -1 ? "Purchase" : alert.textFieldValue(0);
  
  // Submit to Google Apps Script (no category - auto-detect)
  await submitTransaction(amount, transactionName, "");
}

async function submitTransaction(amount, name, category) {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const body = {
      action: "addFromShortcut",
      amount: parseFloat(amount),
      merchant: name,
      date: today,
      category: category
    };
    
    let req = new Request(SCRIPT_URL);
    req.method = "POST";
    req.headers = {
      "Content-Type": "application/json"
    };
    req.body = JSON.stringify(body);
    
    let response = await req.loadJSON();
    
    if (response.success) {
      // Show success
      let alert = new Alert();
      alert.title = "✅ Saved";
      alert.message = `€${amount} - ${name}`;
      alert.addAction("OK");
      await alert.presentAlert();
    } else {
      throw new Error(response.error || "Failed to save");
    }
  } catch (error) {
    let alert = new Alert();
    alert.title = "❌ Error";
    alert.message = error.toString();
    alert.addAction("OK");
    await alert.presentAlert();
  }
}

// Display widget
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  // Running in app - show the quick transaction form
  await showQuickTransactionForm();
  Script.complete();
  return;
}

Script.complete();