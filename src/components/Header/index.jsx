import Logo from 'public/assets/logo.jsx';
import styles from './styles.module.scss';
import {Component} from 'react';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className={styles.header}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.menu}>
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}