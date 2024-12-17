import React, { useState } from 'react';
import {
  AddDataButton,
  ColorInput,
  ColumnLayout,
  ControlContentWrapper,
  ControlDropdown,
  DataInputParagraph,
  DataInputRow,
  DataInputWrapper,
  DataSeriesWrapper,
  ErrorMessage,
  GhostButton,
  GroupHeading,
  GroupSubheading,
  HeadingGroup,
  IndentParagraph,
  InfoMessage,
  InputColumnLayout,
  MessageColumn,
  NoDataWrapper,
  NumberInput,
  RowLayout,
  SpaceBtwnRowLayout,
  Spacer8px,
  StandardButton,
  StyledFileInput,
  SubmitDataButton,
} from '../styles/appStyle';
import { NoDataSVG, DeleteSVG, EditSVG, CloseSVG, DownArrowSVG, UpArrowSVG } from '../assets/logos';
import { activeVolcanoes, top20Cities } from './data/mapData';

export default function DataPanel({ setUserData, userData }) {
  const [fileError, setFileError] = useState(false);

  if (userData.length >= 1) {
    return <DataSeries userData={userData} setUserData={setUserData} />;
  }
  return (
    <NoDataPanel userData={userData} setUserData={setUserData} setFileError={setFileError} fileError={fileError} />
  );
}

const NoDataPanel = ({ setUserData, userData, setFileError, fileError }) => {
  const [expandInfo, setExpandInfo] = useState(false);
  return (
    <div>
      <NoDataWrapper>
        {NoDataSVG()}
        <RowLayout>
          <StyledFileInput
            type="file"
            accept=".json"
            onChange={(e) => handleFileChange(e, setUserData, userData, setFileError)}
          />
          <StandardButton onClick={() => addDataSeries({ userData: userData, setUserData: setUserData, data: [] })}>
            {' '}
            Create Empty Dataset
          </StandardButton>
        </RowLayout>
        <DataInputParagraph>
          Or use an example datasets like
          <GhostButton
            onClick={() => addDataSeries({ userData: userData, setUserData: setUserData, data: top20Cities })}
          >
            {' '}
            50cities.json
          </GhostButton>{' '}
          or
          <GhostButton
            onClick={() => addDataSeries({ userData: userData, setUserData: setUserData, data: activeVolcanoes })}
          >
            {' '}
            activevolcanoes.json{' '}
          </GhostButton>
        </DataInputParagraph>
      </NoDataWrapper>
      {fileError && (
        <ErrorMessage>
          <MessageColumn>
            {/* <h2> File Upload Error</h2> */}
            <p> File is too big or not in correct format </p>
          </MessageColumn>
          <span onClick={() => setFileError(false)}> {CloseSVG()}</span>
        </ErrorMessage>
      )}
      {!fileError && (
        <InfoMessage>
          <MessageColumn>
            {/* <h2> File Format</h2> */}
            <p> Uploaded data must be a JSON file containing latitude, longitude and radius data </p>
            {expandInfo && (
              <div>
                <pre>
                  {`{
  "dataset1": [
      {"lat": number, "lng": number, "r": number },
      {"lat": number, "lng": number, "r": number },
      ...
  ],
  "dataset2": [
      {"lat": number, "lng": number, "r": number },
      ...
  ],
}`}
                </pre>
              </div>
            )}
          </MessageColumn>
          <span onClick={() => setExpandInfo(!expandInfo)}> {expandInfo ? UpArrowSVG() : DownArrowSVG()}</span>
        </InfoMessage>
      )}
      <Spacer8px />
      <Spacer8px />
      <Spacer8px />
    </div>
  );
};

const handleFileChange = (event, setUserData, userData, setFileError) => {
  const file = event.target.files[0];
  if (file.size > 2097152 / 2) {
    setFileError(true);
  } else if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      let uploadedData;
      try {
        if (typeof e.target.result == 'string') {
          uploadedData = JSON.parse(e.target.result);
        }
      } catch (e) {
        return console.error(e); // error in the above string (in this case, yes)!
      }
      let data = Object.keys(uploadedData).map((key) => uploadedData[key]);
      const uniqueKeys = [...new Set(data.flat().flatMap((elem) => Object.keys(elem)))];
      if (uniqueKeys.includes('lat') && uniqueKeys.includes('lng') && uniqueKeys.includes('r')) {
        for (let i = 0; i < data.length; i++) {
          data[i].map((element) => {
            element.id = Math.floor(100000 + Math.random() * 900000);
          });
          addDataSeries({ userData: userData, setUserData: setUserData, data: data[i] });
          setFileError(false);
        }
      } else {
        setFileError(true);
      }
    };

    reader.readAsText(file); // Adjust the read method as needed (e.g., readAsDataURL for images)
  }
};

function dataColorUpdate({ category, setUserData, userData, dataset, newColor }) {
  let dataUpdate = [...userData];
  let datasetIndex = dataUpdate.findIndex((x) => x.id == dataset.id);
  dataUpdate[datasetIndex][category] = newColor;
  setUserData(dataUpdate);
}

const DataSeries = ({ userData, setUserData }) => {
  return (
    <ControlContentWrapper>
      {userData.map((x) => (
        <DataSeriesWrapper key={x.id}>
          <Spacer8px />
          <HeadingGroup>
            <SpaceBtwnRowLayout>
              <GroupHeading>{x.dataSeries} </GroupHeading>
              <GhostButton onClick={() => deleteDataSeries({ setUserData, userData, dataSeriesID: x.id })}>
                Delete{' '}
              </GhostButton>
            </SpaceBtwnRowLayout>
          </HeadingGroup>
          <RowLayout>
            <InputColumnLayout>
              <GroupSubheading>Data Type</GroupSubheading>

              <ControlDropdown>
                <option value="circle">Circle</option>
                <option value="path" disabled>
                  Path
                </option>
              </ControlDropdown>
            </InputColumnLayout>
            <InputColumnLayout>
              <GroupSubheading>Fill</GroupSubheading>
              <ColorInput
                type="color"
                name="fillColor"
                defaultValue={x.fillColor}
                onChange={(e) =>
                  dataColorUpdate({
                    category: 'fillColor',
                    setUserData: setUserData,
                    userData: userData,
                    newColor: e.target.value,
                    dataset: x,
                  })
                }
              />
            </InputColumnLayout>
            <InputColumnLayout>
              <GroupSubheading>Outline</GroupSubheading>
              <ColorInput
                type="color"
                name="outlineColor"
                defaultValue={x.outlineColor}
                onChange={(e) =>
                  dataColorUpdate({
                    category: 'outlineColor',
                    setUserData: setUserData,
                    userData: userData,
                    newColor: e.target.value,
                    dataset: x,
                  })
                }
              />
            </InputColumnLayout>
          </RowLayout>
          <Spacer8px />
          <Spacer8px />
          <ColumnLayout>
            <RowLayout>
              <GroupSubheading>Data</GroupSubheading>
            </RowLayout>
            <DataInput setUserData={setUserData} dataset={x} userData={userData} />
          </ColumnLayout>
          <Spacer8px />
          <Spacer8px />
          <Spacer8px />
        </DataSeriesWrapper>
      ))}
      <RowLayout $justifyContent="flex-end">
        <StandardButton onClick={() => addDataSeries({ userData: userData, setUserData: setUserData, data: [] })}>
          Create New Dataset
        </StandardButton>
      </RowLayout>
      <Spacer8px />

      <Spacer8px />
    </ControlContentWrapper>
  );
};

const DataInput = ({ setUserData, dataset, userData }) => {
  const [addingData, setAddingData] = useState(false);

  return (
    <DataInputWrapper>
      <DataInputRow>
        <p> 1</p>
        <p>[</p>
      </DataInputRow>
      {dataset.data.map((x, i) => (
        <DataInputLatLng
          key={x.id}
          setUserData={setUserData}
          userData={userData}
          datapoint={x}
          dataset={dataset}
          ind={i}
        />
      ))}
      <DataInputRow>
        <p> {dataset.data.length + 2}</p>
        <IndentParagraph>
          {!addingData ? (
            <AddDataButton onClick={() => setAddingData(!addingData)}> + Add Datapoint</AddDataButton>
          ) : (
            <AddDataRow setAddingData={setAddingData} setUserData={setUserData} dataset={dataset} userData={userData} />
          )}
        </IndentParagraph>
      </DataInputRow>
      <DataInputRow>
        <p> {dataset.data.length + 3}</p>
        <p>]</p>
      </DataInputRow>
    </DataInputWrapper>
  );
};

const DataInputLatLng = ({ setUserData, dataset, userData, datapoint, ind }) => {
  const [editingData, setEditingData] = useState(false);

  return (
    <DataInputRow>
      <p> {ind + 2}</p>
      <IndentParagraph>
        {' '}
        {!editingData ? (
          <p>{`{lat: ${datapoint.lat}, lng: ${datapoint.lng}, r: ${datapoint.r}}, `}</p>
        ) : (
          <EditDataRow
            setAddingData={setEditingData}
            setUserData={setUserData}
            dataset={dataset}
            userData={userData}
            datapoint={datapoint}
          />
        )}
        {!editingData && (
          <span
            onClick={() =>
              DeleteDatapoint({ setUserData: setUserData, dataset: dataset, userData: userData, datapoint: datapoint })
            }
          >
            {DeleteSVG()}
          </span>
        )}
        {!editingData && <span onClick={() => setEditingData(!editingData)}>{EditSVG()}</span>}
      </IndentParagraph>
    </DataInputRow>
  );
};

const AddDataRow = ({ setUserData, setAddingData, dataset, userData }) => {
  const [data, setData] = useState({ lat: 5, lng: 5, r: 5, id: Math.floor(100000 + Math.random() * 900000) });
  function clickSubmit() {
    let dataUpdate = [...userData];
    let datasetIndex = dataUpdate.findIndex((x) => x.id == dataset.id);
    dataUpdate[datasetIndex].data.push(data);
    setUserData(dataUpdate);
    setAddingData(false);
  }
  return (
    <RowLayout>
      <LabeledInput label={'lat'} data={data} setData={setData} />
      <LabeledInput label={'lng'} data={data} setData={setData} />
      <LabeledInput label={'r'} data={data} setData={setData} />
      <SubmitDataButton onClick={() => clickSubmit()}>Submit</SubmitDataButton>
    </RowLayout>
  );
};

const EditDataRow = ({ setUserData, setAddingData, dataset, datapoint, userData }) => {
  const [data, setData] = useState({ lat: datapoint.lat, lng: datapoint.lng, r: datapoint.r, id: datapoint.id });

  function clickSubmit() {
    let dataUpdate = [...userData];
    let datasetIndex = dataUpdate.findIndex((x) => x.id == dataset.id);
    let datapointIndex = dataUpdate[datasetIndex].data.findIndex((x) => x.id == datapoint.id);
    dataUpdate[datasetIndex].data[datapointIndex] = { ...data };
    setUserData(dataUpdate);
    setAddingData(false);
  }
  return (
    <RowLayout>
      <LabeledInput label={'lat'} data={data} setData={setData} />
      <LabeledInput label={'lng'} data={data} setData={setData} />
      <LabeledInput label={'r'} data={data} setData={setData} />
      <SubmitDataButton onClick={() => clickSubmit()}>Submit</SubmitDataButton>
    </RowLayout>
  );
};

function DeleteDatapoint({ setUserData, dataset, datapoint, userData }) {
  let dataUpdate = [...userData];
  let datasetIndex = dataUpdate.findIndex((x) => x.id == dataset.id);
  dataUpdate[datasetIndex].data = dataUpdate[datasetIndex].data.filter((x) => x.id != datapoint.id);
  setUserData(dataUpdate);
}
const LabeledInput = ({ label, data, setData }) => {
  const [internalVal, setInternalValue] = useState(data[label]);
  return (
    <NumberInput label={label}>
      <p> {label}</p>
      <input
        min={-200}
        type="number"
        name="label"
        value={internalVal}
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={(e) => setData({ ...data, [label]: parseFloat(e.target.value) })}
      />
    </NumberInput>
  );
};
function addDataSeries({ userData, setUserData, data }: { userData: any; setUserData: any; data?: any }) {
  userData.push({
    dataSeries: `Data Series`,
    id: Math.floor(100000 + Math.random() * 900000),
    type: 'circle',
    fillColor: '#000000',
    outlineColor: '#000000',
    data: data ? data : [],
  });
  setUserData([...userData]);
}

function deleteDataSeries({ userData, setUserData, dataSeriesID }) {
  let newUserData = userData.filter((x) => x.id !== dataSeriesID);
  setUserData(newUserData);
}
