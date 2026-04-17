import {styled} from "styled-components";

const BigBold404 = styled.h1`
=
  font-family: 'Arial Black', sans-serif;
  font-weight: 600;
  font-size: 9rem;
  line-height: 0.9;
  text-transform: uppercase;
  color: #800020; 
  letter-spacing: -10px;
  text-align: center;
  margin: 0;
`;

const Page404 = () => {
    return (
        <div>
            <BigBold404 >
                Page Not Found 404
            </BigBold404>
        </div>
    )
}
export default Page404;