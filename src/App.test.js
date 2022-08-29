import App from "./App";
// eslint-disable-next-line sort-imports, no-redeclare
import { render, screen } from "@testing-library/react";

test(
    "renders Hello World",

    () => {

        "use strict";
        render(<App />);
        const linkElement = screen.getByText(/Hello World/i);
        expect(linkElement).toBeInTheDocument();

    }
);

test(
    "renders Integrated CI",

    () => {

        "use strict";
        render(<App />);
        const linkElement = screen.getByText(/Integrated CI/i);
        expect(linkElement).toBeInTheDocument();

    }
);
