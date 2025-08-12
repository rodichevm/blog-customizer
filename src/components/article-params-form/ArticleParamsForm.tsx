import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useRef, useState } from 'react';
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
import { clsx } from 'clsx';
import { useOutSideClickClose } from 'src/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	initialArticleState: ArticleStateType;
	onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	initialArticleState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [draftArticleState, setDraftArticleState] =
		useState<ArticleStateType>(initialArticleState);
	const sidebarRef = useRef<HTMLDivElement | null>(null);

	const handleChange =
		(key: keyof ArticleStateType) => (selected: OptionType) => {
			setDraftArticleState((prevState) => ({ ...prevState, [key]: selected }));
		};
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(draftArticleState);
	};

	const handleReset = () => {
		setDraftArticleState(defaultArticleState);
		onApply(defaultArticleState);
	};
	useOutSideClickClose(isOpen, setIsOpen, sidebarRef);
	useEffect(() => {
		setDraftArticleState(initialArticleState);
	}, [initialArticleState]);

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
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} uppercase={true} weight={800}>
						Задайте параметры
					</Text>
					<Select
						selected={draftArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name={'fontSizeOptions'}
						options={fontSizeOptions}
						selected={draftArticleState.fontSizeOption}
						title={'Размер шрифта'}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						selected={draftArticleState.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={draftArticleState.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						selected={draftArticleState.contentWidth}
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
