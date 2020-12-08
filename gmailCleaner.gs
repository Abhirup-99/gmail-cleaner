

// Purge messages automatically after how many days?
var DELETE_AFTER_DAYS = 1

// Maximum number of message threads to process per run. 
var PAGE_SIZE = 150

/**
 * Create a trigger that executes the purge function every day.
 * Execute this function to install the script.
 */
function setPurgeTrigger() {
  ScriptApp
    .newTrigger('purge')
    .timeBased()
    .everyDays(1)
    .create()
}

/**
 * Deletes any emails from the inbox that are more then 7 days old
 * and not starred or marked as important.
 */
function purge() {  
  var search = 'in:inbox -in:starred -in:important older_than:' + DELETE_AFTER_DAYS + 'd'    
  var threads = GmailApp.search(search, 0, PAGE_SIZE)
  
 
  var cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - DELETE_AFTER_DAYS)
  
  // For each thread matching our search
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i]
    
    // Only delete if the newest message in the thread is older then DELETE_AFTER_DAYS
    if (thread.getLastMessageDate() < cutoff) {
      thread.moveToTrash();
    }
  }
}