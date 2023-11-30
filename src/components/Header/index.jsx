import Logo from 'public/assets/logo.jsx';
import Link from 'next/link';
import {Component} from 'react';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="header">
                <Link href='/'>
                    <Logo />
                </Link>
            </div>
        );
    }
}