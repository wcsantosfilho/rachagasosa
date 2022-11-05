import React, { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import log from 'loglevel';
import config from './../config';

import { Box, Button, Form, FormField, Select } from 'grommet';

const OPTIONS = [];
log.enableAll();
var a = 0;
var b = 0;

// .filter(onlyHighwayOSM)
const onlyHighwayOSM = (item) => {
    return item.class === 'highway' && item.address.country_code === 'br';
}

const arrayAddressesOSM = (item) => {
    return ([item.address.road,
        item.address.town || item.address.city || item.address.city_district,
        item.address.state,
        item.address.country]).join('|');
}


const retrieveAddresses = async (addressPart) => {
   var addressArray = [];
    try {
        log.info(`addressPart: ${addressPart}`);
        // inclui espaço (%20) no endereço para o search
        addressPart = addressPart.replace(/\s/g, "%20");
        // inclui o número 1 para forçar a pesquisa de endereço
        addressPart = '1%20' + addressPart
        let urlCompound = `${config.urlOSM}/search?q=${addressPart}&countrycodes=br&format=json&addressdetails=1`
        const res = await axios.get(urlCompound, { timeout: 5000 });
        log.info(`Axios: ${b}`)
        b += 1;
        const result = res.data
        for (var i in result) {
            addressArray.push(result[i]);
        }
        let adArr = addressArray.map(arrayAddressesOSM);
        let uniqueAdArr = _.uniq(adArr);
        return uniqueAdArr;
    } catch (errors) {
        return [`${errors.message}`, 'error', 'errors'];
    } 
    return ['blabla', 'bleble', 'bloblo'];
}

export const AppForm = () => {
    const [valid, setValid] = useState(false);
    const [startingOptions , setStartingOptions] = useState(OPTIONS);
    const [startingValue, setStartingValue] = useState('');
    const [endingOptions , setEndingOptions] = useState(OPTIONS);
    const [endingValue, setEndingValue] = useState('');

    
    useEffect(() => {
        const onKeyDown = (event) => { console.log(event) }
        window.addEventListener('keydown', onKeyDown)
  
        return () => { window.removeEventListener('keydown', onKeyDown) }
    }, [])

    return (
    <Box fill align="center" justify="center">
      <Box width="medium">
        <Form
          validate="change"
          onReset={(event) => console.log(event)}
          onSubmit={({ value }) => console.log('Submit', value)}
          onValidate={(validationResults) => {
            setValid(validationResults.valid);
          }}
        >
            <Select
                label="Origem"
                name="startingPoint"
                placeholder="origem"
                multiple={false}
                value={startingValue}
                onSearch={(text) => {
                    const delayDebounceFn = setTimeout( () => {
                        a += 1;
                        log.info(`onSearch ${text} | ${a}`)
                        retrieveAddresses(text)
                            .then(arr => { setStartingOptions(arr)})
                    }, 3000)
                    return () => clearTimeout(delayDebounceFn)
                }}
                onChange={event => {
                        console.log('onChange', event.value)
                        setStartingValue(event.value)
                    }    
                }
                options={startingOptions}
                required
            />

            <Select
                label="Destino"
                name="endingPoint"
                placeholder="destino"
                multiple={false}
                value={endingValue}
                onSearch={(text) => {
                    if (text && text.length >= 3) {
                        retrieveAddresses(text)
                        .then(arr => { setEndingOptions(arr)})
                    }
                }}
                onChange={event => {
                        setEndingValue(event.value)
                    }    
                }
                options={endingOptions}
                required
            />

            <FormField
                label="Km/l"
                name="consumePerLiter"
                required
                validate={[
                { regexp: /^[0-9]/i },
                (endingPoint) => {
                    if (endingPoint && endingPoint.length === 1)
                    return 'digite ao menos 1 caracter';
                    return undefined;
                },
                ]}
            />

            <FormField
                label="R$/l"
                name="fuelPrice"
                required
                validate={[
                { regexp: /\d{1,},\d{2}/i },
                (fuelPrice) => {
                    if (fuelPrice && fuelPrice.length === 1)
                    return 'digite ao menos 1 caracter';
                    return undefined;
                },
                ]}
            />

            <Box direction="row" justify="between" margin={{ top: 'medium' }}>
                <Button label="Cancelar" />
                <Button type="reset" label="Limpar" />
                <Button type="submit" label="Calcular" disabled={!valid} primary />
            </Box>
        </Form>
      </Box>
    </Box>
  );
};

AppForm.args = {
  full: true,
};

export default AppForm;
