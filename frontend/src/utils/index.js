import MaterialsColors from '../apis/MaterialsColors';
import _ from 'lodash';

export const findMaterialByColor = (colorValue) => {

    colorValue = colorValue.toUpperCase();
    const material = _.findKey( MaterialsColors, material => {
        return material === colorValue;
    })

    return material;
}
