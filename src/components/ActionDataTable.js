import React, { Children, createRef } from 'react';
import ReactPaginate from 'react-paginate'
import 'materialize-css/dist/css/materialize.min.css'
import './tables.css'
import constants from './constants';
import M from 'materialize-css'
import Preloader from './Preloader';

class ActionDataTable extends React.Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.columns = props.columns;
        this.state = {
            perPage: 10, sort: true, activeSort: this.columns[0].key, filteredData: [],
            currentPage: 0, currentPageData: [], data: [], searchVal: '', approving: false, deleteId: ''
        }
        this.selectRef = createRef()
        this.dropRef = createRef()
        this.dropInst = {}
        this.modalRef = createRef()
        this.modalInst = {}
        this.setCurrentPageData = this.setCurrentPageData.bind(this)
        this.sortBy = this.sortBy.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handlePageCount = this.handlePageCount.bind(this)
        this.filterRows = this.filterRows.bind(this)
        this.edit = this.edit.bind(this)
        this.view = this.view.bind(this)
        this.selectRow = this.selectRow.bind(this)

    }

    componentDidMount() {
        this._isMounted = true;
        M.FormSelect.init(this.selectRef.current)
        let token = JSON.parse(localStorage.getItem('tokens'))?.access_token
        fetch(this.props.url, {
            method: 'GET',
            headers: { 'Authorization': token, 'Content-type': 'application/json' }
        }).then(res => res.json()).then(res => {
            if (this._isMounted | true) {
                //console.log(res)
                let data = res.data ? res.data : []
                this.setState({ ...this.state, filteredData: data, data: data }, () => {
                    this.setCurrentPageData()
                })
            }
        }).catch(err => {
            console.log(err)
            M.toast({ html: 'Something went wrong.', classes: 'red' });
            //window.location.href = constants.url + 'login'
        })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidUpdate(prevProps, prevState) {
        //this.modalInst = M.Modal.getInstance(this.modalRef.current) 
        if (prevState.approving !== this.state.approving || prevProps.editMode !== this.props.editMode) {
            let token = JSON.parse(localStorage.getItem('tokens'))?.access_token
            fetch(this.props.url, {
                method: 'GET',
                headers: { 'Authorization': token, 'Content-type': 'application/json' }
            }).then(res => res.json()).then(res => {
                if (true | this._isMounted) {
                let data = res.data ? res.data : []
                this.setState({ ...this.state, filteredData: data, data: data }, () => {
                    this.setCurrentPageData()
                })}
            }).catch(err => {
                console.log(err)
                M.toast({ html: 'You are probably not logged in. Please do.', classes: 'red' });
                window.location.href = constants.url + 'login'
            }
            )
        }
    }

    edit(values) {
        if (values.length > 0) {
            this.props.editProp(values)
        }
    }

    view(values) {
        if (values.length > 0) {
            this.props.sellProp(values)
        }
    }

    confirmDelete(id) {

        this.setState({ ...this.state, deleteId: id })
        this.modalInst.open()
    }
    selectRow(id) {
        console.log('ID SELECT: ', id)
    }
    deleteTest() {
        //alert(this.state.deleteId)

    }

    filterRows(value) {
        if (!value.trim() === '') {
            this.state.data = this.props.data
        } else {
            this.setState({ ...this.state, searchVal: value.toString().trim().toLowerCase() }, () => {
                let filtered = [...this.state.data].filter((dataRow) => {
                    if (dataRow[this.state.activeSort].toString().toLowerCase().includes(this.state.searchVal)) {
                        return true
                    } else {
                        return false
                    }
                })
                this.setState({ ...this.state, filteredData: filtered }, () => {
                    this.setCurrentPageData()
                })
            })
        }
    }

    setCurrentPageData() {
        let offset = this.state.currentPage * this.state.perPage
        let filtered = this.state.filteredData
        this.currentPageData = filtered.slice(offset, parseInt(offset) + parseInt(this.state.perPage))
        if(this.currentPageData){
            this.setState({ ...this.state, currentPageData: [...this.currentPageData ]})
        }
    }

    sortBy(key) {
        //Sequencial state updates need callback since they are asynchronous.
        this.setState({ ...this.state, sort: !this.state.sort }, () => {
            this.setState({ ...this.state, activeSort: key }, () => {
                this.state.filteredData.sort((a, b) => {
                    if ((a[key] > b[key])) { return this.state.sort ? 1 : -1 }
                    if ((a[key] < b[key])) { return this.state.sort ? -1 : 1 }
                    if ((a[key] === b[key])) { return 0 }
                })
                this.setCurrentPageData()
            })
        })
    }
    handleClick(current) {
        this.setState({ ...this.state, currentPage: current.selected }, () => {
            this.setCurrentPageData()
        })
    }

    handlePageCount(count) {
        this.setState({ ...this.state, perPage: count, currentPage: 0 }, () => {
            this.setCurrentPageData()
        })
    }

    render() {
        return (
            <>
                {
                    this.state.approving && this.state.data ?
                        <Preloader message="Processing..." />
                        :
                        <div className="">

                            <div className="row">
                                <div className="input-field col l5 m5 s12 offset-l3 offset-m3" style={{ 'paddingLeft': '30px', 'paddingRight': '30px' }}>
                                    <i className="material-icons prefix">search</i>
                                    <input data-testid="search-input" onChange={(e) => this.filterRows(e.target.value)} name="filter" value={this.state.searchVal} type="text" id="filter" />
                                    <label htmlFor="filter" style={{ 'paddingLeft': '30px', 'paddingRight': '30px' }}>Click column-header and start typing</label>
                                </div>
                            </div>

                            {
                                (this.state.data && this.state.currentPageData?.length > 0 && this.state.data?.length > 0) ?
                                    <>
                                        <div className="table-responsive" style={{ 'overflowX': 'auto' }}>
                                            <table className="highlight centered" style={{ 'border': 'green' }}>
                                                <thead>
                                                    <tr>
                                                        {
                                                            this.columns.map((header, index) => {
                                                                return (
                                                                    <th style={{ 'minWidth': '130px' }} onClick={() => this.sortBy(header.key)} key={index}>
                                                                        {header.value}
                                                                        <span>
                                                                            {this.state.activeSort === header.key ?
                                                                                <i className="material-icons right">{this.state.sort ? 'arrow_drop_down' : 'arrow_drop_up'}</i>
                                                                                :
                                                                                <i className="material-icons right">list</i>
                                                                            }
                                                                        </span>
                                                                    </th>

                                                                )
                                                            })
                                                        }
                                                        <th style={{ 'minWidth': '200px' }}>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.currentPageData && this.state.currentPageData.map((row, indexrow) => {
                                                            return (
                                                                <tr key={indexrow}>

                                                                    {
                                                                        Object.values(row).slice(0).map((cellvalue, index) => {
                                                                            return (
                                                                                <td key={index}>
                                                                                    {cellvalue}
                                                                                </td>
                                                                            )
                                                                        })
                                                                    }
                                                                    <td>

                                                                        <a onClick={() => this.edit(Object.values(row))} className='dropdown-trigger btn purple' ref={this.dropRef} href='#' data-target='dropdown1'>
                                                                            <i data-testid={`settings-btn-${indexrow}`} className="material-icons">settings</i>
                                                                        </a>

                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col l2 m2 s12 center">
                                                <select className="browser-default" value={this.state.perPage} ref={this.selectRef} name="pageno" onChange={(e) => this.handlePageCount(e.target.value)}>
                                                    {
                                                        [5, 10, 20, 30, 50, 100, this.state.data.length].map((amt, index) => {
                                                            return (
                                                                <option key={index} value={amt}>{amt}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="col l10 m10 s12">
                                                <ReactPaginate
                                                    pageCount={Math.ceil(this.state.data.length / this.state.perPage)}
                                                    pageRangeDisplayed={5}
                                                    marginPagesDisplayed={2}
                                                    previousLabel="Previous"
                                                    nextLabel="Next"
                                                    nextClassName="waves-effect labelnp"
                                                    previousClassName="waves-effect labelnp"
                                                    breakLabel="..."
                                                    onPageChange={(current => this.handleClick(current))}
                                                    initialPage={this.state.currentPage}
                                                    containerClassName="pagination center"
                                                    pageClassName="waves-effect"
                                                    activeClassName="active"
                                                    disabledClassName="disabled"
                                                />
                                            </div>
                                        </div>

                                    </>
                                    :
                                    <div className="center container">
                                        <div className="card row center">
                                            <br></br><br></br>
                                            <div className='row center'>
                                                No data available.
                                            </div>
                                            <br></br><br></br>
                                        </div>
                                    </div>
                            }
                        </div>

                }
            </>
        );
    }
}
export default ActionDataTable;