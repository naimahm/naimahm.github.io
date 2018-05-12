import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      calcs: [],
      summaryType: 'table'
    };
    this.updateName = this.updateName.bind(this);
    this.saveRow = this.saveRow.bind(this);
    this.unSaveRow = this.unSaveRow.bind(this);
    this.addRow = this.addRow.bind(this);
    this.togglePerson = this.togglePerson.bind(this);
    this.updateAmount = this.updateAmount.bind(this);
    this.updateThing = this.updateThing.bind(this);
    this.printRows = this.printRows.bind(this);
    this.printSummaryByThing = this.printSummaryByThing.bind(this);
    this.printSummaryByUser = this.printSummaryByUser.bind(this);
    this.toggleSummaryType = this.toggleSummaryType.bind(this);
    this.people = ['Katie', 'Erin', 'James', 'Laura', 'Sarah', 'Naimah'];
  }

  updateName(evt){
    let newCalcs = this.state.calcs;
    if(newCalcs.length)
      newCalcs.forEach(c=>{
        if(c){
          c.people.add(evt.target.value);
          c.people.delete(this.state.name);
        }
      })
    else
      this.addRow(evt.target.value)
    this.setState({name: evt.target.value, calcs: newCalcs})
  }

  saveRow(rowIndex){
    let newCalcs = this.state.calcs;
    if(newCalcs[rowIndex]['amount'] && newCalcs[rowIndex]['thing'].length){
      newCalcs[rowIndex]['saved'] = true;
      newCalcs[rowIndex]['perCost'] = newCalcs[rowIndex]['amount']/newCalcs[rowIndex]['people'].size;
      this.setState({calcs: newCalcs})
    }
  }

  unSaveRow(rowIndex){
    let newCalcs = this.state.calcs;
    newCalcs[rowIndex]['saved'] = false;
    this.setState({calcs: newCalcs})
  }

  addRow(name = false){
    const emptyRow = {
      people: new Set(),
      amount: 0,
      thing: '',
      saved: false,
      perCost: 0
    };
    emptyRow.people.add(name);
    let newCalcs = this.state.calcs;
    newCalcs.push(emptyRow);
    this.setState({calcs: newCalcs})
  }

  updateThing(evt, rowIndex){
    let newCalcs = this.state.calcs;
    newCalcs[rowIndex]['thing'] = evt.target.value;
    this.setState({calcs: newCalcs})
  }

  updateAmount(evt, rowIndex){
    let newCalcs = this.state.calcs;
    newCalcs[rowIndex]['amount'] = evt.target.value;
    this.setState({calcs: newCalcs})
  }

  togglePerson(evt, person, rowIndex){
    let newCalcs = this.state.calcs;
    if(evt.target.checked) newCalcs[rowIndex]['people'].add(person)
    else newCalcs[rowIndex]['people'].delete(person)
    this.setState({calcs: newCalcs})
  }

  printRows(){
    return this.state.calcs.map((r, i)=>{      
      return (
        <section key={i} className="rows">
          <div>
            <label>
              What are we calculating?
              <input 
                type="text"
                value={this.state.calcs[i]['thing']}
                onChange={(evt)=>this.updateThing(evt, i)}
                placeholder="CVS, Ralph's, etc.."
                disabled={r.saved} />
            </label>
          </div>
          <div>
            <label>
              Total cost?
              <input 
                type="text"
                value={this.state.calcs[i]['amount']}
                onChange={(evt)=>this.updateAmount(evt, i)}
                disabled={r.saved} />
            </label>
          </div>
          <div>
            Who needs to split this?
            {this.people.map((p, j)=>(
              <label className={"whodunit" + (this.state.name === p || this.state.calcs[i]['people'].has(p) ? ' selected' : '')} key={j}>
                {p} 
                <input 
                  type="checkbox" 
                  onChange={(evt)=>this.togglePerson(evt,p, i)}
                  disabled={this.state.name === p || r.saved}
                  checked={this.state.name === p || this.state.calcs[i]['people'].has(p)}
                />
              </label>
            ))}
          </div>
          {!r.saved && <button onClick={()=>this.saveRow(i)} disabled={!(this.state.calcs[i]['amount'] && this.state.calcs[i]['people'].size > 1)}>Save this row</button>}
          {r.saved && <button onClick={()=>this.unSaveRow(i)}>Edit this row</button>}
        </section>
      )
    })
  }

  printSummaryByUser(){
    if(this.state.calcs.length > 0){
      const calcByPerson = this.state.calcs.reduce((calcByPerson, calc)=>{
        calc.people.forEach(p=>{
          if(!calcByPerson[p]) calcByPerson[p] = {sum: 0, why: []};
          calcByPerson[p]['sum'] += calc.perCost;
          calcByPerson[p]['why'].push(calc.thing);
        });
        return calcByPerson
      }, {});
      return (
        <table>
          <thead>
            <tr>
            <th></th>
            <th>Owes {this.state.name}</th>
            <th>Expenses</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(calcByPerson).map( cbp =>
              (<tr key={cbp[0]}>
                <td>{cbp[0]}</td>
                <td>${cbp[1]['sum'].toFixed(2).toString()}</td>
                <td><ul>{cbp[1]['why'].map(w=>w && <li key={w}>{w}</li>).filter(w=>w)}</ul></td>
              </tr>)
            )}
          </tbody>
        </table>
      );
    }return null;
  }

  printSummaryByThing(){
    if(this.state.calcs.length > 0)
      return (
        <ul>
          {this.state.calcs.map((c,i)=>c.perCost > 0 && <li key={i}>{[...c.people.values()].join(',')} owe {this.state.name} ${c.perCost} each for {c.thing}</li>)}
        </ul>)
    return null;
  }

  toggleSummaryType(summaryType){
    this.setState({summaryType})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Coachella payment calculator</h1>
        </header>
        <p className="App-intro">
          Enter your data and then take a screenshot of the results
        </p>
        <section className="empty-info">
          <label>
            Your name
            <select
              value={this.state.name}
              onChange={this.updateName}>
              <option value="" />
              {this.people.map(p=><option value={p} key={p}>{p}</option>)}
            </select>
          </label>
        </section>
        {this.printRows()}
        {this.state.calcs.length > 0 && <button className='add-row' onClick={()=>this.addRow(this.state.name)}>Add another thing to split</button>}
        <section>
        {this.state.calcs.length > 0 && <a href="#" onClick={()=>this.toggleSummaryType('table')}>Display in Table Format</a>}
        {this.state.calcs.length > 0 && <a href="#" onClick={()=>this.toggleSummaryType('sentence')}>Display in Sentence Format</a>}
        </section>
        {this.state.summaryType === "table" && this.printSummaryByUser()}
        {this.state.summaryType === "sentence" && this.printSummaryByThing()}
      </div>
    );
  }
}

export default App;
