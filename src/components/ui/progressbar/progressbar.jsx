"use client";

import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
	stepConnectorClasses,
} from "@mui/material/StepConnector";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import { FaTruckLoading } from "react-icons/fa";
import { LuPackageCheck } from "react-icons/lu";
import { FaTruckFast } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";
import CancelIcon from "@mui/icons-material/Cancel";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 22,
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundImage:
				"linear-gradient( 95deg,#6366f1 0%,#3b82f6 50%,#06b6d4 100%)",
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundImage:
				"linear-gradient( 95deg,#6366f1 0%,#3b82f6 50%,#06b6d4 100%)",
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 3,
		border: 0,
		backgroundColor:
			theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
		borderRadius: 1,
	},
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
	backgroundColor:
		theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
	zIndex: 1,
	color: "#fff",
	width: 50,
	height: 50,
	display: "flex",
	borderRadius: "50%",
	justifyContent: "center",
	alignItems: "center",
	...(ownerState.active && {
		backgroundImage:
			"linear-gradient( 136deg, #6366f1 0%, #3b82f6 50%, #06b6d4 100%)",
		boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
	}),
	...(ownerState.completed && {
		backgroundImage:
			"linear-gradient( 136deg, #6366f1 0%, #3b82f6 50%, #06b6d4 100%)",
	}),
}));

function ColorlibStepIcon(props) {
	const { active, completed, className } = props;

	const icons = {
		1: <LuPackageCheck size={24} />,
		2: <FaTruckLoading size={24} />,
		3: <FaTruckFast size={24} />,
		4: <IoCheckmark size={24} />,
		5: <CancelIcon size={24} />,
	};

	return (
		<ColorlibStepIconRoot
			ownerState={{ completed, active }}
			className={className}>
			{icons[String(props.icon)]}
		</ColorlibStepIconRoot>
	);
}

ColorlibStepIcon.propTypes = {
	/**
	 * Whether this step is active.
	 * @default false
	 */
	active: PropTypes.bool,
	className: PropTypes.string,
	/**
	 * Mark the step as completed. Is passed to child components.
	 * @default false
	 */
	completed: PropTypes.bool,
	/**
	 * The label displayed in the step icon.
	 */
	icon: PropTypes.node,
};

const steps = ["Draft", "Packaging", "On The Way", "Done", "Not Delivered"];

export default function ProgressBar({ selectedDetail }) {
	const [step, setStep] = React.useState(0);

	const validator = x => {
		if (x === "Draft") {
			setStep(0);
		} else if (x === "Packaging") {
			setStep(1);
		} else if (x === "OnTheWay") {
			setStep(2);
		} else if (x === "Delivered") {
			setStep(3);
		} else if (x === "NotDelivered") {
			setStep(4);
		}
	};

	React.useEffect(() => {
		validator(selectedDetail);
	}, [selectedDetail]);

	return (
		<Stack sx={{ width: "100%" }} spacing={4}>
			<Stepper
				alternativeLabel
				activeStep={step}
				connector={<ColorlibConnector />}>
				{steps.map(label => (
					<Step key={label}>
						<StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
		</Stack>
	);
}
