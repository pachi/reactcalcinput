# React-calc-input

React component implementing a numeric input entry with simple math expression parsing.

This component allows entering numerical values and simple math expressions. These are evaluated when the ENTER or TAB keys are pressed and on blurring the input.

If the expression validates, the value is computed and displayed using the chosen precision. If it doesn't validate, then the last valid value is displayed.

The component uses a callback to notify when a valid value has been accepted.

## Bootstrap styles

The component uses Bootstrap classes for style, using feedback colors and glyphs

See http://getbootstrap.com/css/#forms-control-validation for valid icons.


## Valid operators

Simple expressions can have two operands and the following operators:
    - + (addition)
    - - (substraction)
    - * (multiplication)
    - / (division)

## Properties

The compoment accepts the following custom properties:

- `value`: initialvalue for the input entry
- `bgonedit`: background color while in edit mode
- `label`: entry label
- `precision`: value default precision on validation
- `placeholder`: placeholder text
- `glyphicon`: glyph icon class name to show besides the input entry
- `onChange`: callback to notify the accepted value

# License

This is free software distributed under a MIT License.

Copyright (c) 2017 Rafael Villar Burke <pachi@rvburke.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
