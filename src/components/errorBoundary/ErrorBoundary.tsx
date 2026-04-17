import {Component, ErrorInfo, ReactNode} from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    error: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state = {
        error: false
    }

    static getDerivedStateFromError(error: Error) {
        return {error: true};
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.log(error, info);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;