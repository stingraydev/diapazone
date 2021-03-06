import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setIsLoading, getImage, signOut } from '../../store/actions';

import { Image } from './components';
import { OptionsForm } from './components';
import { NavBarComponent } from '../navbar';

const RandomImage = ({ image, isLoading, callImageAction, signOutAction }) => {
	const [stateCheckbox, setStateCheckBox] = useState({
		isCheckedTitle: false,
		isCheckedImage: false,
	});

	const handleChangeCheckBox = (event) => {
		const { checked, id } = event.target;
		setStateCheckBox({
			...stateCheckbox,
			[id]: checked,
		});
	};

	return (
		<>
			<NavBarComponent signOut={signOutAction} showMenu={true} />
			<Container className="text-center mt-5">
				<Row className="col">
					<Col>
						<OptionsForm
							image={image}
							loadImage={callImageAction}
							isLoading={isLoading}
							handleChangeCheckBox={handleChangeCheckBox}
							{...stateCheckbox}
						/>
					</Col>
					<Col>
						{isLoading ? (
							<Spinner animation="border" role="status">
								<span className="sr-only">Loading...</span>
							</Spinner>
						) : (
							<Image {...image} {...stateCheckbox} />
						)}
					</Col>
				</Row>
			</Container>
		</>
	);
};

RandomImage.propTypes = {
	image: PropTypes.object,
	isLoading: PropTypes.bool,
	callImageAction: PropTypes.func,
	setLoadingAction: PropTypes.func,
	signOut: PropTypes.func,
};

const mapToStateToProps = (store) => ({
	...store.image,
});

const mapDispatchToProps = (dispatch) => ({
	callImageAction: () => dispatch(getImage()),
	setLoadingAction: (status) => dispatch(setIsLoading(status)),
	signOutAction: (payload) => dispatch(signOut(payload)),
});

export default connect(mapToStateToProps, mapDispatchToProps)(RandomImage);
