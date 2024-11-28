import { HttpStatusCode } from 'axios';
import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import LockedOut from 'src/pages/LoginPage/LoginFailureMessage/LockedOut';
import LoginFailure from 'src/pages/LoginPage/LoginFailureMessage/LoginFailure';
import Suspended from 'src/pages/LoginPage/LoginFailureMessage/Suspended';
import { TRootState } from 'src/redux/reducers';
import configs from 'src/commons/configs';

const mapStateToProps = (state: TRootState) => ({
    loginFailure: state.authenticationStore.loginFailure,
});

const LoginFailureMessage = ({ loginFailure }: ReturnType<typeof mapStateToProps>) => {
    const { count, lockedCount, statusCode, timestamp, isSuspended } = loginFailure ?? {};
    const { loginFailedThreshold, lockedOutThreshold, lockedOutDuration } = configs;

    const enum Content {
        LoginFailure,
        LockedOut,
        Suspended,
    }

    const content = useMemo(() => {
        if (statusCode === HttpStatusCode.Locked)
            return isSuspended ? Content.Suspended : Content.LockedOut;

        return Content.LoginFailure;
    }, [statusCode, isSuspended]);

    switch (content) {
        case Content.LoginFailure:
            return (
                <LoginFailure
                    count={count}
                    lockedCount={lockedCount}
                    loginFailedThreshold={loginFailedThreshold}
                    lockedOutThreshold={lockedOutThreshold}
                    lockedOutDuration={lockedOutDuration}
                />
            );
        case Content.LockedOut:
            return (
                <LockedOut
                    timestamp={timestamp}
                    lockedOutDuration={lockedOutDuration}
                />
            );
        default:
            return (<Suspended />);
    }
};

export default connect(mapStateToProps)(LoginFailureMessage);
