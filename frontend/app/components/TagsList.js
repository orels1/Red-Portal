/**
 * Created by antonorlov on 10/02/2017.
 */
import React from 'react';
import {Link} from 'react-router';

import Tags from './items/Tags';

class TagsList extends React.Component {
    constructor(props) {
        super(props);
        // We are getting state from our store
        // And listen to any changes to get the two-way binding
        this.state = {
            'tags': [],
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // Will fire once, after markup has been injected
        fetch('/api/v1/misc/tags/top')
            .then((response) => {
                if (!response.ok) throw new Error('Fetch failed');
                return response.json();
            })
            .then((json) => {
                this.setState({'tags': json.results.list});
            })
            .catch((err) => {
                throw err;
            });
    }

    componentWillUnmount() {
        // Will fire once before markup has been removed
    }

    onChange(state) {
        // We are listening to the store here and apply changes to this.state accordingly
        this.setState(state);
    }

    render() {
        return (
            <div className="cogs">
                <div className="stats-header padding">
                    <div className="cogs-stats d-flex justify-content-between align-items-sm-center align-items-md-stretch flex-sm-column flex-md-row flex-wrap">
                        <div className="d-flex flex-column justify-content-between">
                            <Tags
                                list={this.state.tags}
                                inline={false}
                                limit={1000}
                                horizontal={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TagsList;
