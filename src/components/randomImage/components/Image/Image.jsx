import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import isNil from 'lodash/isNil';

import { API } from '../../../../common/constants';
import { ImageViewer } from './ImageViewer';

export const Image = ({ img, alt, title, isCheckedTitle, isCheckedImage }) => {
	const [viewerIsOpen, setState] = useState(false);

	const handleSwitchStateViewer = () => {
		setState((prevState) => {
			return !prevState;
		});
	};

	return (
		<Row>
			<Col className="text-left">
				{!isNil(img) ? (
					<>
						{isCheckedTitle && <Alert variant="success">{title}</Alert>}
						{isCheckedImage && (
							<div className="measures__wrapper mt-2">
								<img
									className="measures__image"
									src={`${API}${img}`}
									alt={alt}
									onClick={handleSwitchStateViewer}
								/>
							</div>
						)}
					</>
				) : (
					<Alert variant="dark">Данных для отображения нет</Alert>
				)}
				{!isNil(img) && !isCheckedTitle && !isCheckedImage && (
					<Alert variant="warning">Вы не выбрали ни один параметр для показа</Alert>
				)}
			</Col>
			<ImageViewer
				isOpen={viewerIsOpen}
				seState={handleSwitchStateViewer}
				img={img}
				alt={alt}
				api={API}
			/>
		</Row>
	);
};