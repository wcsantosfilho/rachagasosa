//appForm.js

<FormField
label="Origem"
name="startingPoint"
required
validate={[
{ regexp: /^[a-z]/i },
(startingPoint) => {
    if (startingPoint && startingPoint.length === 2)
    return 'digite ao menos 3 caracteres';
    return undefined;
},
]}
/>

<FormField
label="Destino"
name="endingPoint"
required
validate={[
{ regexp: /^[a-z]/i },
(endingPoint) => {
    if (endingPoint && endingPoint.length === 2)
    return 'digite ao menos 3 caracteres';
    return undefined;
},
]}
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
{ regexp: /^[0-9],[0-9]/i },
(fuelPrice) => {
    if (fuelPrice && fuelPrice.length === 1)
    return 'digite ao menos 1 caracter';
    return undefined;
},
]}
/>
