import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

$(function () {
  function PhoneList (state = [], action) {
    switch (action.type) {
      case 'ADD':
        return state.concat([action.text])
      case 'DELETE':
        state.splice(action.deleteIndex, 1)
        return state
      default:
        return state
    }
  }

  const store = createStore(
    PhoneList,
    [{name: '王大明', telphone: '0939393939', country: 'tw'}])

  class ImputBox extends React.Component {
    constructor (props) {
      super(props)
      this.addNewDate = this.addNewDate.bind(this)
    }

    addNewDate () {
      if (this.refs.name.value.length === 0) {
        alert('請填寫聯絡人姓名')
        this.refs.name.focus()
        return
      }

      var regex = /^\d+$/

      if (!regex.test(this.refs.telphone.value)) {
        alert('請填寫聯絡人電話')
        this.refs.telphone.focus()
        return
      }
      if (this.refs.country.value === '') {
        alert('請選擇聯絡人國家')
        this.refs.country.focus()
        return
      }

      store.dispatch({
        type: 'ADD',
        text: {
          name: this.refs.name.value,
          telphone: this.refs.telphone.value,
          country: this.refs.country.value}
      })
      this.refs.name.value = ''
      this.refs.telphone.value = ''
      this.refs.country.value = ''
    }

    render () {
      return (
        <div>
          <h2>新增聯絡人</h2>
          <div className='row'>
            <div className='form-group col-sm-4'>
              <input className='form-control ds-input' type='text' ref='name' name='name' placeholder='姓名' />
            </div>
            <div className='form-group col-sm-4'>
              <input className='form-control ds-input' type='text' ref='telphone' name='telphone' placeholder='電話' />
            </div>
            <div className='form-group col-sm-3'>
              <select className='form-control' ref='country' name='country'>
                <option value='' defaultValue >請選擇國家</option>
                <option value='tw'>台灣</option>
                <option value='cn'>中國</option>
                <option value='jp'>日本</option>
              </select>
            </div>
            <div className='form-group col-sm-1'>
              <button className='btn btn-primary' onClick={this.addNewDate} >+</button>
            </div>
          </div>
        </div>
      )
    }
  }

  class ListUl extends React.Component {
    constructor (props) {
      super(props)
      this.state = {allList: store.getState()}
      this.deleteDate = this.deleteDate.bind(this)
    }

    deleteDate (index) {
      store.dispatch({type: 'DELETE', deleteIndex: index})
    }
    render () {
      var ListLi = this.state.allList.map((node, index) => {
        return (
          <li key={index} className='nav-item active row border-bottom p-1'>
            <span className='col-sm-3 align-middle'>{node.name}</span>
            <span className='col-sm-3 align-middle'>{node.telphone}</span>
            <span className='col-sm-3 align-middle'>
              {node.country === 'tw' && '台灣'}
              {node.country === 'cn' && '中國'}
              {node.country === 'jp' && '日本'}
            </span>
            <button className='btn btn-primary col-sm-3 btn-sm' onClick={this.deleteDate.bind(this, index)} >刪除</button>
          </li>
        )
      })
      return (
        <ul className='navbar-nav mr-auto'>
          {ListLi}
        </ul>
      )
    }
    componentDidMount () {
      store.subscribe(() => {
        this.setState({
          allList: store.getState()
        })
      })
    }
  }

  class Conten extends React.Component {
    render () {
      return (
        <div>
          <h1>個人電話簿</h1>
          <ImputBox />
          <ListUl />
        </div>
      )
    }
  }
  ReactDOM.render(
    <Conten />,
    document.getElementById('contentbox')
  )
})
