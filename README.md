# elvenar-adventure
Helper project for easy elvenar adventures.

- a perl script: |adv2csv|
takes an adventure page from elvengems, and outputs a CSV file,
suitable for inclusion in a google sheet

Every path checkpoint is output as a csv line: first a list of booleans 
for each of the nine possible paths, followed by the 16 badges totals

This file should be imported into the proper elvenar google sheet, which
will do magic with those csv.

- some javascript glue: |onedit.js|

this is responsible for being able to record timestamps for a given line
in a google sheet.  It's geared towards elvenar, so it will mark any
row changed in the "Stock" or "Preparation" named ranges into the corresponding
column of the "timestamp"  named range.
