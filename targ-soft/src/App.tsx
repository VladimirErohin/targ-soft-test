import React from 'react';
import './styles.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/data/odata/store';
import {createStore} from 'devextreme-aspnet-data-nojquery';

import DataGrid, {
    Column,
    Editing,
    Popup,
    Paging,
    Form, RemoteOperations,
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import {Item} from 'devextreme-react/form';
import Footer from "./footer/footer";

const notesEditorOptions = {height: 100};

const serviceUrl = 'https://jsonplaceholder.typicode.com';
const remoteDataSource = createStore({
    key: 'id',
    loadUrl: serviceUrl + '/posts',
    insertUrl: serviceUrl + '/posts',
    deleteUrl: serviceUrl + '/posts/1'
});

interface IListItemProps {
    id: number;
    title: string,
    description: string,
}

interface IComponentState {
    posts: IListItemProps[];
}

class App extends React.Component<IListItemProps, IComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }


    detData = remoteDataSource.load()
    getPosts = this.detData
        .then((data) => {
            this.setState(prevState => {
                return {
                    posts: [...data]
                }
            });
        });

    render() {
        return (
            <div id="data-grid-demo">
                <DataGrid
                    dataSource={this.state.posts}
                    keyExpr="id"
                    showBorders={true}
                >
                    <Paging enabled={true} pageSize={10} />
                    <Editing
                        mode="popup"
                        allowAdding={true}
                        allowDeleting={true}>
                        <Popup title="Post Info" showTitle={true} width={700} height={525}/>
                        <Form>
                            <Item itemType="group" colCount={1} colSpan={2}>
                                <Item dataField="id"/>
                                <Item dataField="title"/>
                                <Item
                                    dataField="body"
                                    editorType="dxTextArea"
                                    colSpan={2}
                                    editorOptions={notesEditorOptions}/>
                            </Item>
                        </Form>
                    </Editing>
                    <Column dataField="id" width={60}/>
                    <Column dataField="title"/>
                    <Column dataField="body"/>
                    <RemoteOperations groupPaging={true}/>
                </DataGrid>
                <Footer>
                    Copyright © 2011-{new Date().getFullYear()} Inc.
                    <br />
                    All trademarks or registered trademarks are property of their
                    respective owners.
                </Footer>
            </div>
        );
    }
}

export default App;
