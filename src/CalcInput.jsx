/* -*- coding: utf-8 -*-

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
*/

/* Numeric input entry with simple math expression parsing

   It uses Bootstrap classes for style
   http://getbootstrap.com/css/#forms-control-validation

   Valid operators: + - * /
   Parameters:
   - value: initialvalue for the input entry
   - bgonedit: background color while in edit mode
   - label: entry label
   - precision: value default precision on validation
   - placeholder: placeholder text
   - onChange: callback to notify the accepted value
 */

import React, { PropTypes } from 'react';

const VALIDREGEX = /^((?:[0-9]*[.,])?[0-9]+)\s*(([\/*+-])\s*((?:[0-9]*[.,])?[0-9]+))?\s*$/;

export default class CalcInput extends React.Component {
  constructor(props) {
    super(props);
    const { precision, value } = this.props;
    this.precision = parseInt(precision, 10) || 2;
    this.state = { currentValue: value,
                   lastValidValue: value,
                   isValid: true,
                   onEdit: false,
                   regainFocus: false };
  }

  static defaultProps = {
    value: 0,
    bgonedit: 'LightGoldenRodYellow',
    label: '',
    placeholder: 'Number or arithmetic expression',
    precision: 2,
    glyphicon: 'glyphicon-phone'
  }

  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    bgonedit: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    precision: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    glyphicon: PropTypes.string,
    onChange: PropTypes.func
  }

  render() {
    const { bgonedit, placeholder, label } = this.props;
    const { currentValue, isValid, onEdit } = this.state;

    const background = onEdit ? bgonedit : '';
    let borderColor;
    let validationState;
    if (onEdit) {
      if (isValid) {
        borderColor = 'green';
        validationState = 'has-success';
      } else {
        borderColor = 'orange';
        validationState = 'has-warning';
      }
    } else {
      borderColor = null;
      validationState = '';
    }

    const labelElement = label ? <label className="control-label">{ label } </label>: '';

    return (
      <div className={ `form-group ${validationState} has-feedback` } >
        { labelElement }
        <input className="form-control"
               type="text"
               ref={ ref => this.entry = ref }
               style={ { background, borderColor } }
               value={ currentValue }
               placeholder={ placeholder }
               onChange={ e => this.handleChange(e) }
               onKeyDown={ e => this.handleKeyDown(e) }
               onBlur={ e => this.acceptValue() }/>
        <i className={ `glyphicon ${ this.props.glyphicon } form-control-feedback` }></i>
      </div>);
  }

  // Update internal state on change
  handleChange(e) {
    const currentValue = e.target.value;
    this.setState({ currentValue,
                    isValid: VALIDREGEX.test(currentValue),
                    onEdit: true });
  }

  // Accept using enter or tab keys
  handleKeyDown(e) {
    const lastValidValue = this.state.lastValidValue;
    if (e.keyCode === 13 || e.keyCode === 9) {
      // Enter (13) or Tab (9) keys to accept
      this.acceptValue();
    } else if (e.keyCode === 27) {
      // Esc (27) to restore to lastValidValue
      this.setState({ currentValue: lastValidValue,
                      isValid: true,
                      onEdit: false });
      e.preventDefault(); // Avoid handleChange after this.
    } else {
      this.setState({ onEdit: true });
    }
  }

  // Update component state and refer to callback whether in a valid state
  acceptValue() {
    const { isValid, currentValue, lastValidValue } = this.state;

    if (isValid) {
      let newvalue = this.parseEntry(currentValue);
      if (newvalue !== null && newvalue !== parseFloat(lastValidValue)) {
        newvalue = newvalue.toFixed(this.precision);
        this.setState({ currentValue: newvalue,
                        lastValidValue: newvalue,
                        onEdit: false });
        this.props.onChange(newvalue);
      }
    } else {
      this.setState({ currentValue: lastValidValue,
                      isValid: true,
                      onEdit: false });
    }
  }

  // Parse value and compute expression when it's a simple arithmetic expression
  parseEntry(value) {
    // make sure value is a string before replacement
    // const DECSEP = (1.1).toLocaleString().substring(1,2);
    let newvalue = value.toString().replace(/,/g, '.');
    let [ _expr, val1, group1, op, val2 ] = newvalue.match(VALIDREGEX);

    if (group1 === undefined) {
      newvalue = parseFloat(newvalue);
    } else {
      val1 = parseFloat(val1);
      val2 = parseFloat(val2);
      if (op === '+') {
        newvalue = (val1 + val2);
      } else if (op === '-') {
        newvalue = Math.max((val1 - val2), 0.0);
      } else if (op === '*') {
        newvalue = (val1 * val2);
      } else if (op === '/') {
        newvalue = (val1 / val2);
      }
    }
    return newvalue;
  }

}
