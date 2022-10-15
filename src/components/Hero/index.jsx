import styles from './styles.module.scss';
import { useEffect, useState, useCallback } from 'react';

export default function Hero() {
  let [title, setTitle] = useState("Hello!");
  const titles = [
    'Hello!',
    'Hola!',
    'Olá!',
    'Hei!',
    '여보세요!',
    'γεια!',
    'Kaixo!',
    '你好!',
    'こんにちは!',
		'Ç’kemi!',
		'اسلا عليكم!',
		'Вітаю!',
		'Aloha!',
		'Ciao!'
	];

	const updateTitle = () => {
    // get index of title based on it from titles array
    const index = titles.indexOf(title);
    
    // get next index
    const nextIndex = index + 1 === titles.length ? 0 : index + 1;
		setTitle(titles[nextIndex]);
	};

	useEffect(() => {
			const intervalID = setInterval(updateTitle, 3000);
			setTimeout(() => {
				updateTitle
			}, 3000);
			return () => clearInterval(intervalID);
	}, [updateTitle])

  return (
    <div className={styles.hero}>
      {titles.map((title_value, index) => (
        <div key={index} className={title_value == title ? styles.visible : styles.heroTitle}>{title_value}</div> 
      ))}
      <h1 style={{maxWidth:500}}>I'm Oleg Pasternak </h1>
    </div>
  )
}
