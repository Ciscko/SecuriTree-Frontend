import { screen, render } from '@testing-library/react';
import Buildhierarchy from '../BuildHierarchy';

let areas = {
    name: 'Area 1', child_areas: [{
        name : 'Area 2', child_areas:[{
            name : 'Area 3', child_areas:[], child_area_ids:[],doors:[{name:'Door for A3'}], access_rules:['User 2']
        }], child_area_ids:['3'],doors:[{name:'Door for A1'}], access_rules:['User 1']
    }], child_area_ids:['2'],doors:[{name:'Door for A2'}], access_rules:['User 1','User 2']
}
describe('rendering hierarchy based on data object', () => {
    test('Renders parent area', () => {
        render(<Buildhierarchy {...areas} />);
        let a1 = screen.getByText(/Area 1/i);
        expect(a1).toBeInTheDocument('Area 1');
    });

    test('Renders child area', () => {
        render(<Buildhierarchy {...areas} />);
        let a1 = screen.getByText(/Area 2/i);
        expect(a1).toBeInTheDocument('Area 2');
    });

    test('Renders grand-children area', () => {
        render(<Buildhierarchy {...areas} />);
        let a1 = screen.getByText(/Area 3/i);
        expect(a1).toBeInTheDocument('Area 3');
    });

    test('Renders grand-children area', () => {
        render(<Buildhierarchy />);
        let a1 = screen.getByText(/The provided area object does not have the required: name or access_rules or doors/i);
        expect(a1).toBeInTheDocument('The provided area object does not have the required: name or access_rules or doors');
    });
})