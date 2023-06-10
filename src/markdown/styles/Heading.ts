import styled from '@emotion/styled';

export const HeadingOne = styled('h1')({
    margin: '16px 0 8px',
    fontSize: '1.rem',
    fontWeight: 700,
    lineHeight: '1.375em'
});

export const HeadingTwo = styled(HeadingOne.withComponent('h2'))({
    fontSize: '1.25rem'
});

export const HeadingThree = styled(HeadingOne.withComponent('h3'))({
    fontSize: '1rem'
});
