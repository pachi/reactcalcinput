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

/* Numeric input entry with simple math expression parsing */

import React, { Component } from 'react';
import './App.css';
import CalcInput from './CalcInput';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { initialvalue: 10 };
  }

  render() {
    const myvalue = this.state.initialvalue;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React Calc Input Demo</h2>
        </div>
        <div className="panel-body bg-info" >
          <form className="form-horizontal"
                onSubmit={ e => e.preventDefault() }>
            <fieldset>
                  <CalcInput
                      label="Value or expression:"
                      value={ myvalue }
                      precision={ 2 }
                      onChange={ v => this.setState({ initialvalue: v }) } />
            </fieldset>
            <fieldset>
              Result: <input readOnly value={ myvalue } />
            </fieldset>
          </form>
        </div>
      </div>
    );
  }

}

export default App;
