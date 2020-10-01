# -*- encoding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'Negocio Web',
    'category': 'Website',
    'author': 'Adventumweb',
    'sequence': 5,
    'version': '1.0',
	'license' : 'OPL-1',
    'depends': ['website'],
    'data': [   
    'security/ir.model.access.csv',
        'views/assets.xml',   
		# 'views/home-app.xml',
		'views/home-digital.xml',
		  'views/home-agency.xml',
    'views/home-auto.xml',
	 	'views/home-medical.xml',
	  'views/home-business.xml',
    'views/home-business2.xml',
    'views/home-cleaning.xml',
    'views/home-construction.xml',
    
    'views/home-education.xml',
    'views/home-elder-care.xml',
    'views/home-finance.xml',
    'views/home-gym.xml',
    'views/home-gardener.xml',
    'views/home-industrial.xml',
    'views/home-law.xml',
    'views/home-moving.xml',
       'views/home-rastro.xml',
       
        'views/home-solar.xml',
        'views/home-transport.xml',
        'views/home-shop1.xml',
        'views/home-shop2.xml',
        
         'views/snippets.xml',
        'views/snippets_option.xml',
        'views/website_view.xml',
        'views/template.xml',
        'views/footer.xml',
        'views/page_about2.xml',
        'views/page_about.xml'
    ],
    'live_test_url':'http://negocio.adventumweb.com/',
  	'installable': True,
      
	'price': 75.00,
    'currency': 'EUR',
    'application': True
}
