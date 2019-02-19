import React, { Component } from 'react';
import { Button } from '@storybook/react/demo';

class DangerButton extends Component {
    render() {
        return (
            <Button>
                <span role="img" aria-label="so cool">
                    😀 😎 👍 💯
                </span>
            </Button>
        )
    }
}

export default DangerButton; 