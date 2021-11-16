import React, {ReactElement} from 'react';
import './styles.scss';
import RecipientMultiInput from "./components/RecipientMultiInput/RecipientMultiInput";

const App: React.FC = (): ReactElement => {

    return <div className="container">
        <div className="input-container">
            <RecipientMultiInput onChange={(recipients) => {
                // just for debug purposes
                console.log('Valid recipients');
                console.table(recipients.filter(el => el.id !== undefined));

                console.log('Invalid recipients');
                console.table(recipients.filter(el => el.id === undefined));
            }
            }/>
        </div>
    </div>;
};
export default App;
