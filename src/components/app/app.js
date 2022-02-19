import React from 'react'
import AppHeader from '../app-header/app-hearder'
import SearchPanel from '../search-panel/search-panel'
import PostStatusFilter from '../post-status-filter/post-status-filter'
import PostList from '../post-list/post-list'
import PostAddForm from '../post-add-form/post-add-form' 

//import css files
import './app.css'
import '../post-add-form/post-add-form.css'
import '../post-list/post-list.css'
import '../post-list-item/post-list-item.css'
import '../post-status-filter/post-status-filter.css'
import '../search-panel/search-panel.css'
import '../app-header/app-header.css'
import styled from 'styled-components'

const AppBlock = styled.div`
        margin: 0 auto;
        max-width: 800px;
`

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {label:"Going to market", important:false, like:true, id:'alkd'},
                {label:"Learn Js", important:true, like:false, id:'aiekd'},
                {label:"Lear React tutorial", important:false, like:false, id:'alkdiiek'}
            ],
            term:'',
            filter: 'all'
        }
    }
    deleteItem = (id) => {
        this.setState( ({data}) => {
            const index = data.findIndex(elem => elem.id ===id);

            const newArr = [...data.slice(0, index), ...data.slice(index+1)];

            return {
                data: newArr
            }
        });
    }
    
    addItem = (body) => {
       if(body.trim()) {
        const newItem = {
            label: body,
            important: false,
            like: false,
            id: Date.now()
        }
        this.setState( ({data}) => {
            const newArr = [...data, newItem];

            return {
                data: newArr
            }
        });
       }
    }

    onToggleImportant = (id) => {
        this.setState( ({data}) => {
            const index = data.findIndex(elem => elem.id ===id);
            
            const old = data[index];
            const newItem = {...old, important: !old.important};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index+1)];

            return{
                data: newArr
            }
        })
    }

    onToggleLiked = (id) => {
        this.setState( ({data}) => {
            const index = data.findIndex(elem => elem.id ===id);
            
            const old = data[index];
            const newItem = {...old, like: !old.like};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index+1)];

            return{
                data: newArr
            }
        })
    }

    filterPost(items, filter) {
        if(filter === 'like') {
            return items.filter(item=> item.like)
        }else return items;
    }

    serchPost(items, term) {
        if(term.length === 0) {
            return items
        }
        return items.filter( (item) => {
            return item.label.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }
    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const liked = this.state.data.filter(elem=> elem.like).length;
        const important = this.state.data.filter(elem=> elem.important).length;
        const allPosts = this.state.data.length;

        const visiblePosts = this.filterPost(this.serchPost(data, term), filter);
        return (
            <AppBlock>
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}>
                </AppHeader>
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch = {this.onUpdateSearch}
                    ></SearchPanel>
                    <PostStatusFilter
                    filter={filter}
                    onFilterSelect = {(filter) => this.onFilterSelect(filter)}
                    >

                    </PostStatusFilter>
                </div>
                <PostList 
                    props={visiblePosts}
                    onDelete={(id) => this.deleteItem(id)}
                    onToggleImportant = {(id) => this.onToggleImportant(id)}
                    onToggleLiked = {(id) => this.onToggleLiked(id)}
                >
            
                </PostList>
                <PostAddForm onAdd = {(body) => this.addItem(body)}></PostAddForm>
            </AppBlock>
        )
    }
}
