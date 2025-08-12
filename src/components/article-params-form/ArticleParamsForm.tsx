import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [ArticleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const sidebarRef = useRef<HTMLDivElement | null>(null);
	const handleChange =
		(key: keyof typeof defaultArticleState) => (selected: OptionType) => {
			setArticleState((prevState) => ({ ...prevState, [key]: selected }));
			console.log(ArticleState);
		};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen((isOpen) => !isOpen);
				}}
			/>
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form}>
					<Text size={31} uppercase={true} weight={800}>
						Задайте параметры
					</Text>
					<Select
						selected={ArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name={'fontSizeOptions'}
						options={fontSizeOptions}
						selected={ArticleState.fontSizeOption}
						title={'Размер шрифта'}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						selected={ArticleState.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={ArticleState.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						selected={ArticleState.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
