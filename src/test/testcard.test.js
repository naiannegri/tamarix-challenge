import { render, screen  } from "@testing-library/react";
import DataCard from "../components/DataCard"
import '@testing-library/jest-dom/extend-expect';



test('Given string element in data card, a string should be returned', () => {

const { debug } = render(<DataCard title="test title" subtitle="test subtitle" />)
        debug()
        const test = screen.getByText('test title')
        const testSubtitle = screen.getByText('test subtitle')
});