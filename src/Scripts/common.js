import { createStore } from 'redux'

$(function () {
  function PhoneList (state = [], action) {
    switch (action.type) { // 判別type掉入相對應的操作中
      case 'addDate':
        return state.concat([action.text])
      default:
        return state
    }
  }

  const store = createStore(
    PhoneList,
    [{name: '王大明', telphone: '0939393939'}]) // 初始化 放入初始化的資料

  class ImputBox extends React.Component {
    constructor (props) {
      super(props)
      this.addNewDate = this.addNewDate.bind(this)
    }

    addNewDate () {
      // 開始用 type = addDate 的方法(上面設定的) 就可以加入資料了
      store.dispatch({
        type: 'addDate',
        text: {name: '王B明', telphone: '092s9128'}
      })
    }

    render () {
      return (
        <div>
          <h2>新增聯絡人</h2>
          <input type='text' name='name' placeholder='姓名' />
          <input type='text' name='telphone' placeholder='電話' />
          <select name='country'>
            <option value='fiat' defaultValue >請選擇國家</option>
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
    constructor (props, context) {
      super()
      this.state = {allList: store.getState()}
    }
    render () {
      var ListLi = this.state.allList.map(function (node, index) {
        return (
          <li key={index}>
            <span>{node.name}</span>
            <span>{node.telphone}</span>
          </li>
        )
      })
      return (
        <ul>{ListLi}</ul>
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
