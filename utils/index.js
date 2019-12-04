const  formatItemForMail = (item) => {
   
    return {
        id: item.id,
        name: item.fields.Name,
        type: item.fields.Type,
        pictures: item.fields.Picture.map( picture => { return picture.url }),
        price: item.fields['Unit Cost'],
        dimensions: item.fields['Size (WxLxH)'],
        settings: item.fields['Settings'],
        materials: item.fields['Materials and Finishes'],
        link: 'http://localhost:3000/catalog/'+item.id,
        description: item.fields.Description.replace(/\n/g, "<br>")

    }
}

exports.formatItemForMail = formatItemForMail;