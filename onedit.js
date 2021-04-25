// Copyright (c) 2020-2021 Marc Espie <espie@openbsd.org>
// 
// Permission to use, copy, modify, and distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
// 
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

// I'm generally not a big fan of JavaScript.
// This snippet will auto-fill "last changed" column based on named ranges
function onEdit(e) {
  var s = SpreadsheetApp.getActiveSheet();
  var ts_range = s.getRange("timestamp"); // ranges belong to a given sheet
  if (ts_range.getSheet().getName() == s.getName()) {
    var c = s.getActiveCell();
    // XXX we assume all those ranges are on the same page!
    ["Stock", "Preparation"].forEach(
        function(name) {
          stampTime(ts_range, c, s.getRange(name));
        });
    
    stampTime(s.getRange("badgeTimestamps"), c, s.getRange("Badges")); 
  }
}

// internal function: 
//      - range to stamp
//      - active cell
//      - range to look at
function stampTime(stampRange, c, range) {
  var col = c.getColumn();
  var row = c.getRow();
  var xmin = range.getColumn();
  var xmax = xmin + range.getWidth();
  var ymin = range.getRow();
  var ymax = ymin + range.getHeight();
  if (col >= xmin && col < xmax && row >= ymin && row <= ymax) {
    // do we have a multiple column range, or just one column ?
    var x = (stampRange.getWidth() > 1) ? xmin : col;
    // find where we live in timestamp        
    var cell = c.offset(stampRange.getRow()-ymin, stampRange.getColumn()-x);
    cell.setValue(new Date());
  }
}
    
function myReset() {
  var s = SpreadsheetApp.getActiveSheet();
  ["aNettoyer1", "aNettoyer2", "aNettoyer3", "aNettoyer4", "aNettoyer5", "aNettoyer6"].forEach(
    function(n) {
      var range = s.getRange(n);
      range.clearContent();
    });
}
    


