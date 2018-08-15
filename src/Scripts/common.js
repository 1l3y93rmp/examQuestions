import { createStore } from 'redux'

$(function () {
  function PhoneList (state = [], action) {
    // action 攜帶參數進來
    switch (action.type) { // 判別type掉入相對應的操作中
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
    [{name: '王大明', telphone: '0939393939', country: 'tw'}]) // 初始化 放入初始化的資料

  /** ***************** */
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

      // 開始用 type = ADD 的方法(上面設定的) 就可以加入資料了
      store.dispatch({
        type: 'ADD',
        text: {
          name: this.refs.name.value,
          telphone: this.refs.telphone.value,
          country: this.refs.country.value}
      })
    }

    render () {
      return (
        <div>
          <h2>新增聯絡人</h2>
          <input type='text' ref='name' name='name' placeholder='姓名' />
          <input type='text' ref='telphone' name='telphone' placeholder='電話' />
          <select ref='country' name='country'>
            <option value='' defaultValue >請選擇國家</option>
            <option value='tw'>台灣</option>
            <option value='cn'>中國</option>
            <option value='jp'>日本</option>
          </select>
          <button onClick={this.addNewDate} >+</button>
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
          <li key={index}>
            <span>{node.name}</span>
            <span>{node.telphone}</span>
            <span>
              {node.country === 'tw' && '台灣'}
              {node.country === 'cn' && '中國'}
              {node.country === 'jp' && '日本'}
              <button onClick={this.deleteDate.bind(this, index)} >刪除</button>
            </span>

          </li>
        )
      })
      return (
        <ul>
          {ListLi}
        </ul>
      )
    }
    componentDidMount () {
      // 使用 store.subscribe 觸發 setState更新
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
