// Copyright (c) 2020 Marc Espie <espie@openbsd.org>
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
function onEdit() {
  var s = SpreadsheetApp.getActiveSheet();
  try { // if I'm not on the right sheet, no timestamp range!
    var ts_range = s.getRange("timestamp");
    var c = s.getActiveCell();
    var col = c.getColumn();
    var row = c.getRow();
    
    var names = ["Stock", "Preparation"];
    var xstamp = ts_range.getColumn();
    names.forEach(
      function(name) {
        var range = s.getRange(name);
        var xmin = range.getColumn();
        var xmax = xmin + range.getWidth();
        var ymin = range.getRow();
        var ymax = ymin + range.getHeight();
        if (col >= xmin && col < xmax && row >= ymin && row <= ymax) {
	  // XXX this should actually compute the full location of the
	  // cell so that both Stock and Prep update a single cell
	  // so further row arithmetic, plus funny offset (haven't figured
	  // absolute locations yet, and string references are clunky)
          var cell = c.offset(0, xstamp-col);
          cell.setValue(new Date());
        }
      });
  } finally {}
}