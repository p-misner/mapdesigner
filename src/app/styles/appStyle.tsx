import styled from 'styled-components';

type StyleVariables = {
  $selectedCountryColor?: string;
  $gradientStart?: string;
  $gradientEnd?: string;
};
type tooltipStyle = {
  $x: number;
  $y: number;
  $visible: boolean;
};

export const PluginWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  position: relative;
  font: 14px sans-serif;
  margin: 0px;
  font-family: 'Roboto Flex', sans-serif;
  font-weight: 300;
  background-color: white;
`;

export const GlobeWrapper = styled.div<StyleVariables>`
  display: flex;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23535353' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  flex-direction: column;
  height: 500px;
  h3 {
    color: grey;
  }
`;

export const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
  height: 470px;
  background-color: white;
`;

export const TooltipWrapper = styled.div<tooltipStyle>`
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  display: block;
  position: absolute;
  top: ${(props) => props.$y};
  left: ${(props) => props.$x};
  font-size: 14px;
  padding: 4px 6px;
  border-radius: 4px;
  text-align: center;
  transform: translate(-50%, 0%);
  visibility: ${(props) => (props.$visible ? 'visible' : 'hidden')};
`;

export const SubmitButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  bottom: 0px;
  right: 0px;
  width: 100%;
  background-color: white;
  border-top: 1px solid gainsboro;
  padding: 8px 12px;
  justify-content: flex-end;
`;
export const IndentParagraph = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: row;
  span {
    margin-left: 8px;
    visibility: hidden;
    cursor: pointer;
  }
  &:hover {
    span {
      visibility: visible;
    }
  }
`;

type RowLayoutType = {
  $justifyContent?: string;
};
export const RowLayout = styled.div<RowLayoutType>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => (props.$justifyContent ? props.$justifyContent : 'space-between')};
  span {
    opacity: 40%;
  }
`;
export const SpaceBtwnRowLayout = styled(RowLayout)`
  width: 100%;
  margin-bottom: 8px;
`;
export const ColorRowLayout = styled(RowLayout)`
  padding: 4px 16px;
`;
export const CheckboxRowLayout = styled(RowLayout)`
  padding: 12px 16px 8px 16px;
  justify-content: flex-start;
  align-items: center;
  column-gap: 8px;
`;
export const RadioRowLayout = styled(RowLayout)`
  padding: 12px 4px;
  justify-content: flex-start;
  align-items: center;
  column-gap: 8px;
`;

export const ColumnLayout = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;
export const InputColumnLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

export const ColorInput = styled.input`
  border: transparent;
  outline: transparent;
  background-color: transparent;
  width: 64px;
  height: 32px;
  min-height: 32px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
export const RangeInput = styled.input`
  margin-top: 8px;
  background: transparent;
  cursor: pointer;
  &::-webkit-slider-runnable-track {
    background: #f7f7f7;
    border: 0.5px solid grey;
    height: 0.5rem;
  }
  &:focus {
    outline: none;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    margin-top: -6px; /* Centers thumb on the track */
    background-color: #000;
    height: 1.2rem;
    width: 0.5rem;
  }
  &:focus::-webkit-slider-thumb {
    border: 1px solid rgba(0, 0, 0, 0.1);
    outline: 3px solid rgba(0, 0, 0, 0.1);
    outline-offset: 0rem;
  }
`;

type NumberInputType = {
  label: string;
};
export const NumberInput = styled.div<NumberInputType>`
  position: relative;
  margin-right: 2px;
  p {
    position: absolute;
    left: 4px;
    top: 6px;
    text-transform: uppercase;
    font-size: 12px;
  }
  input {
    padding: 4px 0px 4px ${(props) => (props.label.length == 3 ? '32px' : '16px')};
    /* min-width: 128px; */
    max-width: 64px;
    border-radius: 4px;
    border: 1px solid lightgray;
    &:focus {
      outline: none;
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const GroupLabel = styled.label`
  font-weight: 500;
  white-space: nowrap;
  font-size: 14px;
  margin-right: 12px;
`;
export const Subtitle = styled.p`
  font-size: 16px;
  font-family: 'Roboto Flex', sans-serif;
  padding: 16px;
  color: gray;
  text-align: center;
`;
export const GroupHeading = styled.h3`
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 4px;
  /* white-space: nowrap; */
`;
export const HeadingGroup = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  div {
    cursor: pointer;
  }
`;
export const GroupSubheading = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: grey;
  margin-bottom: 4px;
`;
export const Spacer8px = styled.div`
  height: 8px;
`;
export const StandardButton = styled.button`
  border-radius: 4px;
  background: white;
  color: black;
  font-family: 'Roboto Flex', sans-serif;
  font-weight: 500;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 8px 8px;
  margin: 0 5px;
  outline: none;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

export const AddDataButton = styled(StandardButton)`
  background: rgba(24, 160, 251, 0.15);
  border: none;
  color: #1898ee;
  padding: 4px 8px;
  max-height: 24px;
  font-size: 12px;
  &:hover {
    box-shadow: none;
    background: rgba(24, 160, 251, 0.25);
  }
`;
export const SubmitDataButton = styled(StandardButton)`
  background: rgba(24, 160, 251, 1);
  border: 1px solid #18a0fb;
  color: white;
  padding: 4px 8px;
  max-height: 24px;
  font-size: 12px;
  &:hover {
    box-shadow: none;
    background: rgba(24, 160, 251, 0.25);
  }
`;

export const HighlightSubmitButton = styled(StandardButton)`
  background: #18a0fb;
  border: 1px solid #18a0fb;
  color: white;
  padding: 8px;
`;
export const HighlightButton = styled(StandardButton)`
  background: #18a0fb;
  border: 1px solid #18a0fb;
  color: white;
  padding: 8px;
`;

export const GhostButton = styled(StandardButton)`
  color: #18a0fb;
  border: none;
  background-color: none;
  padding: 0px 0px;
  font-size: 14px;
  font-weight: 400;
  &:hover {
    box-shadow: none;
    text-decoration: underline;
  }
`;

export const StyledFileInput = styled.input`
  width: 90px;
  border-radius: 4px;

  &::file-selector-button {
    cursor: pointer;
    background: lightgray;
    border: 1px solid rgba(0, 0, 0, 0.2);
    font-family: 'Roboto Flex', sans-serif;
    color: #000;
    padding: 8px;
    font-weight: 500;
    border-radius: 4px;
    /* color: white; */
  }
  &:hover {
    box-shadow: 1px 1px 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

export const DataInputParagraph = styled.p`
  line-height: 1.4em;
  color: grey;
`;

type TabType = {
  $active: boolean;
};
export const TabGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  column-gap: 0;
`;
export const TabButton = styled.button<TabType>`
  background: none;
  border: none;
  border-bottom: ${(props) => (props.$active ? '4px solid #18a0fb' : '0px')};
  color: ${(props) => (props.$active ? 'black' : 'grey')};
  padding: 12px 16px; /* Some padding */
  padding-bottom: ${(props) => (props.$active ? '8px' : '12px')};
  font-weight: ${(props) => (props.$active ? '500' : '300')};
  cursor: pointer;
  font-size: 14px;
  font-family: 'Roboto Flex', sans-serif;
`;

export const ControlContentWrapper = styled.div`
  margin: 16px 16px;
  display: flex;
  flex-direction: column;
  /* row-gap: 16px; */
`;
export const NoDataWrapper = styled.div`
  margin: 16px 16px;
  border-radius: 8px;
  border: 1px dashed gray;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 360px;
`;

export const DataSeriesWrapper = styled.div``;

export const DataInputWrapper = styled.div`
  background-color: #f7f7f7;
  /* background-color: red; */
  border-radius: 8px;
  box-shadow: inset -4px 4px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  row-gap: 0px;
  max-height: 142px;
  overflow-y: auto;
`;
export const DataInputRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  column-gap: 16px;
  padding-left: 8px;
  height: 32px;
  min-height: 32px;
`;
export const ControlDropdown = styled.select`
  padding: 4px 0px 4px 8px;
  min-width: 128px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid lightgray;
  &:focus {
    outline: none;
  }
`;

export const LabelSideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    min-width: 110px;
    max-width: 110px;
  }
`;
export const ColorInputsWrapper = styled.div`
  /* margin-top: 6px; */
  flex-grow: 2;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: inset -4px 4px 16px rgba(0, 0, 0, 0.05);
  padding: 8px 0px;
  div:nth-last-of-type(2) {
    padding-bottom: 8px;
    border-bottom: 1px solid lightgray;
  }
`;

export const CountryPillWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 8px;
  margin-top: 16px;
  span {
    cursor: pointer;
  }
`;

export const CountryPill = styled.div`
  background-color: rgb(222, 222, 230);
  color: black;
  border: 1px solid grey;
  border-radius: 4px;
  padding-left: 4px;
  padding-right: 4px;
  font-size: 14px;
  max-height: 24px;
  display: flex;
  column-gap: 12px;
  flex-direction: row;
  align-items: center;
  &:hover {
    background-color: rgb(183, 183, 184);
  }
`;

export const SVGText = styled.text`
  text-anchor: middle;
`;

export const PresetColorsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 8px;
`;
export const PresetColorDivWrapper = styled.button<{ selected?: boolean }>`
  background-color: white;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  border: 2px solid ${(props) => (props.selected ? '#18a0fb' : 'lightgray')};
  border-radius: 4px;
  padding: 6px 8px;
  :not(:first-child) {
    margin-left: 2px;
  }
  :first-child {
    margin-left: 8px;
  }
  &:hover {
    background: rgba(24, 160, 251, 0.15);
    border: 1px solid #1898ee;
  }
`;
export const PresetColorDiv = styled.div<{ color: string }>`
  min-height: 12px;
  height: 100%;
  width: 8px;
  background-color: ${(props) => props.color};
`;

export const Message = styled.div`
  max-width: 336px;
  margin: 16px 16px;
  padding: 8px 12px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ErrorMessage = styled(Message)`
  background-color: hsl(2.5, 66.3%, 95%);
  border: 1px solid hsl(2.5, 66.3%, 85%);
`;
export const InfoMessage = styled(Message)`
  background-color: #f7f7f7;
  border: 1px solid lightgray;
  span {
    cursor: pointer;
    padding: 2px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      max-height: 16px;
      border-radius: 2px;
    }
  }
`;

export const MessageColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90%;
  h2 {
    font-weight: 500;
    margin-bottom: 4px;
  }
  div {
    border-left: 4px solid gray;
    margin-top: 4px;
  }
  pre {
    margin-left: 8px;
    color: gray;
  }
`;
