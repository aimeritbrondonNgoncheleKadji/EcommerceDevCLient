export default [
  {
    property: 'title',
    type: 'string',
    label: 'Nom',
    required: true,
  },
  {
    property: 'description',
    type: 'string',
    label: 'Description',
  },
  {
    property: 'fileUrl',
    type: 'string',
    label: 'Photo',
    dataType: 'url',
  },
  {
    property: 'data',
    type: 'array',
    label: 'Autres données',
    fields: [
      {
        property: 'key',
        type: 'string',
        label: 'Clé',
        required: true,
      },
      {
        property: 'value',
        type: 'string',
        label: 'Valeur',
        required: true,
      },
    ],
  },
];
