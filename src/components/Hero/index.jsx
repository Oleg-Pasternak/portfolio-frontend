import styles from './styles.module.scss';
import { useEffect, useState, useCallback } from 'react';

export default function Hero() {
  const [title, setTitle] = useState("Hello");
  const titles = [
    'Hello',
    'Hola',
    'Olá',
    'Hei',
    '여보세요',
    'γεια',
    'Kaixo',
    '你好',
    'こんにちは',
		'Ç’kemi',
		'اسلا عليكم',
		'Вітаю',
		'Aloha',
		'Ciao'
	];

	const shuffle = useCallback(() => {
			const index = Math.floor(Math.random() * titles.length);
			setTitle(titles[index]);
	}, []);

	useEffect(() => {
			const intervalID = setInterval(shuffle, 3000);
			return () => clearInterval(intervalID);
	}, [shuffle])

  return (
    <div className={styles.hero}>
			<div className={styles.heroTitle}>
				{title}
			</div>
      <h1>
        I'm Oleg Pasternak
      </h1>
    </div>
  )
}
