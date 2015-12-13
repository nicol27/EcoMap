# -*- coding: utf-8 -*-
"""Module contains usefull functions."""
import logging
import logging.config
import os
import random
import string
import smtplib

from email.header import Header
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

CONF_PATH = os.path.join(os.environ['CONFROOT'], 'log.conf')


def random_password(length):
    """Generates randow string. Contains lower- and uppercase letters.
       :params: length - length of string
       :return: string"""
    return ''.join(random.choice(string.ascii_letters) for i in range(length))


def get_logger():
    """function for configuring default logger object
    from standard logging library
        Returns:
            configured logger object.
        Usage:
            import this method to your
            module and call it.
            then define a new logger object as usual
    """
    return logging.config.fileConfig(CONF_PATH)


class Singleton(type):
    """
    using a Singleton pattern to work with only one possible instance of Pool
    """
    def __call__(cls, *args, **kwargs):
        if not hasattr(cls, '_instance'):
            cls._instance = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instance


def send_email(app_name, app_key, msg, user_email):
    """Sends email."""
    server = smtplib.SMTP_SSL('smtp.gmail.com')
    server.login(app_name, app_key)
    server.sendmail('admin@ecomap.com', user_email,
                    msg.as_string())
    server.quit()


def registration_email(user_name, user_surname, user_email, user_password):
    """Sends email to new created users.
       :params: app_name - app's login
                app_key - app's key
                name - user name
                surname - user surname
                email - user email
                password - user password
    """
    TEMPLATE_PATH = os.path.join(os.environ['CONFROOT'],
                                 'registration_email_template.html')

    with open(TEMPLATE_PATH, 'rb') as template:
        html = template.read().decode('utf-8')
    html_decoded = html % (user_name, user_surname,
                           user_email, user_password)

    msg = MIMEMultipart('alternative')
    msg['Subject'] = Header('Реєстрація на ecomap.org', 'utf-8')

    htmltext = MIMEText(html_decoded, 'html', 'utf-8')

    msg.attach(htmltext)
    msg['Subject'] = 'Test email'
    msg['From'] = 'admin@ecomap.com'
    msg['To'] = user_email
    return msg


def restore_password_email(user_name, user_surname, user_email, hashed):
    """Sends to user's email message with link to restore user's password.
       :params: app_name - app's login
                app_key - app's key
                user_name - user's name
                user_surname - user's surname
    """
    TEMPLATE_PATH = os.path.join(os.environ['CONFROOT'],
                                 'restore_password_template.html')
    with open(TEMPLATE_PATH, 'rb') as template:
        html = template.read().decode('utf-8')
    html_decoded = html % (user_name, user_surname, hashed)

    msg = MIMEMultipart('alternative')
    msg['Subject'] = Header('Відновлення паролю до ecomap.org', 'utf-8')

    htmltext = MIMEText(html_decoded, 'html', 'utf-8')

    msg.attach(htmltext)
    msg['Subject'] = 'Test email'
    msg['From'] = 'admin@ecomap.com'
    msg['To'] = user_email
    return msg


def admin_stats_email(data=None):
    """Sends email to new created users.
       :params: app_name - app's login
                app_key - app's key
                name - user name
                surname - user surname
                email - user email
                password - user password
    """
    TEMPLATE_PATH = os.path.join(os.environ['CONFROOT'],
                                 'admin_stats_template.html')

    with open(TEMPLATE_PATH, 'rb') as template:
        html = template.read()

    mes = 'message noone changed </body>'
    table_head = """<table>
        <tr>
            <th>користувач</th>
            <th>mail</th>
            <th>number request</th>
        </tr>
    """
    table_row = """
        <tr>
            <td>%s</td>
            <td>%s</td>
            <td>%d</td>
        </tr>
            """
    if data:
        html += table_head
        for x in data:
            html += table_row % (x[1].encode('utf-8'),
                                 x[2].encode('utf-8'),
                                 int(x[3]))
        else:
            html += '</table></body>'
    else:
        html += mes

    html_decoded = html
    msg = MIMEMultipart('alternative')
    msg['Subject'] = Header('звіт адміністратора на ecomap.org', 'utf-8')

    # htmltext = MIMEText(html_decoded, 'html', 'utf-8')

    # msg.attach(htmltext)
    msg['Subject'] = 'звіт за добу'
    msg['From'] = 'admin@ecomap.com'
    msg['To'] = 'vadime.padalko@gmail.com'

    with app.app_context():
    #     msg.body = render_template(template + '.txt')
        msg.html = render_template('jinja_template.html', data=data)
    #     # mail.send(msg)

    return msg

def admin_stats_email2(data=None):
    """Sends email to new created users.
       :params: app_name - app's login
                app_key - app's key
                name - user name
                surname - user surname
                email - user email
                password - user password
    """
    msg = MIMEMultipart('alternative')
    msg['Subject'] = Header('звіт адміністратора на ecomap.org', 'utf-8')

    with app.app_context():
        msg.html = render_template('jinja_template.html', data=data)

    htmltext = MIMEText(msg.html, 'html', 'utf-8')

    msg.attach(htmltext)
    msg['Subject'] = 'звіт за добу'
    msg['From'] = 'admin@ecomap.com'
    msg['To'] = 'vadime.padalko@gmail.com'
    return msg
